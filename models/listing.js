const mongoose=require('mongoose');
const schema= mongoose.Schema;

const listingSchema= new schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/2104361307/photo/luxury-tropical-pool-villa.jpg?s=1024x1024&w=is&k=20&c=Z3YPL7G1UbEBQCxkQqZYghirBTcvTEUISzPlizEh40I=",
        set:(v)=>v===""? "https://media.istockphoto.com/id/2104361307/photo/luxury-tropical-pool-villa.jpg?s=1024x1024&w=is&k=20&c=Z3YPL7G1UbEBQCxkQqZYghirBTcvTEUISzPlizEh40I=" :v,
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
