const express=require('express')
const AdminRoute=express.Router();
const Admin=require('../Controller/Admin')
AdminRoute.get("/:page",Admin.searchuser)
AdminRoute.patch("/:id",Admin.setpermission);
module.exports=AdminRoute;