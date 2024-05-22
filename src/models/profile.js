const { Schema,model } = require("mongoose")

let Profile
try{
    Profile=model("Profile")
}catch(e){
    const MoneySchema=new Schema({
        
    })
    const ProfileSchema=new Schema({
        uri:{type:String, required:true,min:1,unique:true},
        owner:{type:String, required:true},
        moneydata:[{type:MoneySchema}]
    },{timestamp:true})
    Profile=model("Profile",ProfileSchema)
}

export default Profile  