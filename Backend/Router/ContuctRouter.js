const express=require("express");
const router=express.Router();

const contactcontroller=require("../Controller/ContuctController");

router.post("/", contactcontroller.Create);

router.get("/",contactcontroller.GetUsers);
router.get("/:id",contactcontroller.GetUserById);
router.delete("/:id",contactcontroller.DeleteUser);
  



module.exports=router;  