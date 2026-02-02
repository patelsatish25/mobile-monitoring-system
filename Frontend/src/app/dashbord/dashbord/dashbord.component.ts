import { Token } from '@angular/compiler';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import * as echarts from 'echarts';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {


  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @ViewChild('net',{static:false})netcontener!:ElementRef;
   @ViewChild('orientationchartid',{static:false})orientchart!:ElementRef;
   @ViewChild('MotionchartId',{static:false})motionchartID!:ElementRef;
  private mychars!: echarts.ECharts;
  private netbar!:echarts.ECharts;
  private orientationchart!:echarts.ECharts;
  private Motionchart!:echarts.ECharts;
  private resizeObserver!: ResizeObserver;
opacity: any;
  constructor(
    private socket: SocketService,
    private router: ActivatedRoute,


  ) { }


  batterycolor="rgb(228, 100, 100);"

   originatindata:any= {
    alpha:[],
    beta:[],
    gamma:[]

   }

   motionData:any={
    x:[],
    y:[],
    z:[]
   }



  orientionOption= {
    title: { text: 'Device Orientation (Live)' },
    legend: {
      orient: 'horizontal',
   top: 30,
   left:'center',
      right: 100,
      width: 500,

    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
  },
    tooltip: { trigger: 'axis' },
    animation: false,
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: [
      {
        name: 'Alpha',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: []
      },
      {
        name: 'Beta',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: []
      },
      {
        name: 'Gamma',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: []
      }
    ]
  };

  motionOption= {
    title: { text: 'Device Motion (Live)' },
    legend: {
      orient: 'horizontal',
      top: 30,
      left:'center',
      right: 100,
      width: 500,

    }, grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
  },
    tooltip: { trigger: 'axis' },
    animation: false,
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: [
      {
        name: 'X',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: []
      },
      {
        name: 'Y',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: []
      },
      {
        name: 'Z',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: []
      }
    ]
  };


  option1 = {

      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel:{
          show:false
        },
        splitLine: {
          show:false

        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }

      },
      yAxis: {
        type: 'value',
        splitLine: {
        show:false

      },
      axisLabel:{
        show:false
      }
      },
      series: [
        {
          data: [10,50,100,150,200],
          type: 'bar'
        }
      ]

  };
  option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 100,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          show: false

        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20,
          color: 'white',
          textStyle: {
            color: 'white'
          }
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,

          color: 'inherit'
        },
        data: [
          {
            value: 0,
            name: 'MBPS',

          }
        ]
      }
    ]
  };

  frame = "";
  isAdmin=false;
  dashboardname="user dashborad"
  private map!: L.Map;

  customIcon = L.icon({
    iconUrl: 'assets/placeholder.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  battery = {
    per: 0,
    Charging: false
  };

  netspeed = 0;

  netinfo = {
    type: '',
    speed: 0,
    latency: 0
  };

  location = {
    latitude: 21.24,
    longitude: 73.19,
    accuracy: 10
  };

  marker: any;
  circle: any;

  motion = {
    accelerationx: 0,
    accelerationy: 0,
    accelerationz: 0,
  }
  Orientation = {
    alpha: 0,
    beta: 0,
    gamma: 0
  }
  ngAfterViewInit() {
    this.loadmeter();
    this.loadnetwork();
    this. loadOriention();
    this.loadMotion();


window.addEventListener('resize',()=>{

  this.Motionchart.resize()
  this.orientationchart.resize()
})



  }
  ngOnInit(): void {

     let Token:any=localStorage.getItem('token')
      let decodeToken:any=jwtDecode(Token);

   if(decodeToken.type=="admin")
   {
    this.isAdmin=true;
   }

    const id: any = this.router.snapshot.paramMap.get('id');


    this.socket.connectDevice(id);

    this.loadMap();   // create map once

    this.socket.getBattery().subscribe({
      next: (res: any) => {
        this.battery.per = Math.floor(res.battrylevel * 100);
        this.battery.Charging = res.Charging;
      }
    });

    this.socket.getlocation().subscribe({
      next: (res: any) => {


        this.location.latitude = res.location.latitude;
        this.location.longitude = res.location.longitude;
        this.location.accuracy = res.location.accuracy;
        this.updateMap(res.location);
      }
    });

    this.socket.getspeed().subscribe({
      next: (res: any) => {
        this.netspeed = res.speedMbps;

        this.mychars.setOption({
          series: [
            {
              data: [
                {
                  value: res.speedMbps,
                  name:"MBPS"
                }
              ]
            }
          ]
        });


      }
    });

    this.socket.getNetInfo().subscribe({
      next: (res: any) => {
        this.netinfo.type = res.type;
        this.netinfo.speed = res.speed;
        this.netinfo.latency = res.latency;

        if(res.type==="4g")
        {

            this.netbar.setOption({
        series: [
          {
            data: [10,50,100,150],
            type: 'bar'
          }
        ]
       })
        }else if(res.type==="3g")
        {
          this.netbar.setOption({
            series: [
              {
                data: [10,50,100],
                type: 'bar'
              }
            ]
           })
        }else if(res.type==="5g")
        {
          this.netbar.setOption({
            series: [
              {
                data: [10,50,100,150,200],
                type: 'bar'
              }
            ]
           })
        }else{
          this.netbar.setOption({
            series: [
              {
                data: [10],
                type: 'bar'
              }
            ]
           })
        }



      }
    });
    this.socket.getVideo().subscribe({
      next: (res: any) => {

        this.frame = res.frame

      }
    })

    this.socket.getMotion().subscribe({
      next: (res: any) => {

        this.motion.accelerationx = res.motion.x.toFixed(3);
        this.motion.accelerationy = res.motion.y.toFixed(3);
        this.motion.accelerationz = res.motion.z.toFixed(3)

        this.motionData.x.push([Date.now(),res.motion.x.toFixed(3)])
        this.motionData.y.push([Date.now(),res.motion.y.toFixed(3)])
        this.motionData.z.push([Date.now(),res.motion.z.toFixed(3)])


         if( this.motionData.x.length > 200)
         {
          this.motionData.x.shift();
          this.motionData.y.shift();
          this.motionData.z.shift();

         }

         this.Motionchart.setOption(
          {
          legend: {
            orient: 'horizontal',
            top: 30,
            left:'center',

            formatter: (name: string) => {
              if (name === 'X') {
                return `X : ${this.motion.accelerationx}`;
              }
              if (name === 'Y') {
                return `Y : ${this.motion.accelerationy}`;
              }
              if (name === 'Z') {
                return `Z : ${this.motion.accelerationz}`;
              }
              return name;
            },

          },


          series: [
            {
              name: 'Z',
              type: 'line',
              showSymbol: false,
              data: this.motionData.z
            },
            {
              name: 'X',
              type: 'line',
              showSymbol: false,
              data: this.motionData.x
            },
            {
              name: 'Y',
              type: 'line',
              showSymbol: false,
              data: this.motionData.y
            }
          ]
        }, false);





      }
    })

    this.socket.getOrientation().subscribe({
      next: (res: any) => {
        this.Orientation.alpha = res.alpha.toFixed(3);
        this.Orientation.beta = res.beta.toFixed(3);
        this.Orientation.gamma = res.gamma.toFixed(3);

        this.originatindata.alpha.push([Date.now(),res.alpha.toFixed(3)]);
        this.originatindata.beta.push([Date.now(),res.beta.toFixed(3)]);
        this.originatindata.gamma.push([Date.now(),res.gamma.toFixed(3)]);



  if (this.originatindata.alpha.length > 200) {
    this.originatindata.alpha.shift();
    this.originatindata.beta.shift();
    this.originatindata.gamma.shift();
  }




  this.orientationchart.setOption({
    legend: {
      orient: 'horizontal',
            top: 30,
            left:'center',
      formatter: (name: string) => {
        if (name === 'Alpha') {
          return `Alpha : ${this.Orientation.alpha}`;
        }
        if (name === 'Beta') {
          return `Beta : ${this.Orientation.beta}`;
        }
        if (name === 'Gamma') {
          return `Gamma : ${this.Orientation.gamma}`;
        }
        return name;
      },

    },


    series: [
      {
        name: 'Beta',
        type: 'line',
        showSymbol: false,
        data: this.originatindata.beta
      },
      {
        name: 'Alpha',
        type: 'line',
        showSymbol: false,
        data: this.originatindata.alpha
      },
      {
        name: 'Gamma',
        type: 'line',
        showSymbol: false,
        data: this.originatindata.gamma
      }
    ]
  });


      }
    })
  }




  loadMap() {

    this.map = L.map('maps')
      .setView([this.location.latitude, this.location.longitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);


    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);
  }

  loadmeter() {
    let chart = this.chartContainer.nativeElement;

    this.mychars = echarts.init(chart)

    this.mychars.setOption(this.option)

  }

  updateMap(loc: any) {

    if (!loc || !this.map) return;

    const lat = Number(loc.latitude);
    const lng = Number(loc.longitude);

    this.map.setView([lat, lng], 12);

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    if (this.circle) {
      this.map.removeLayer(this.circle);
    }

    this.marker = L.marker([lat, lng], { icon: this.customIcon })
      .addTo(this.map)
      .bindPopup('Device Location')
      .openPopup();

    this.circle = L.circle([lat, lng], {
      radius: 200,
      color: "red",
      fillColor: "blue",
      fillOpacity: 0.3
    }).addTo(this.map);
  }

   loadnetwork()
   {
      let net=this.netcontener.nativeElement;

     this.netbar=echarts.init(net);
     this.netbar.setOption(this.option1);
   }

   loadOriention()
   {
    let oriention=this.orientchart.nativeElement;
     this.orientationchart=echarts.init(oriention);
     this.orientationchart.setOption(this.orientionOption)
   }
   loadMotion()
   {
    let motion=this.motionchartID.nativeElement;
    this.Motionchart=echarts.init(motion);
    this.Motionchart.setOption(this.motionOption)
   }

}
