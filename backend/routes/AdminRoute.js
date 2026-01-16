const express=require('express')
const AdminRoute=express.Router();
const Admin=require('../Controller/Admin');
const auth = require('../auth');
AdminRoute.get("/:page",Admin.searchuser)
AdminRoute.patch("/:id",auth,Admin.setpermission);
module.exports=AdminRoute;