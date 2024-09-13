const express=require('express');
const app=express();
const port=3000;
const mongoose=require("mongoose");
const mongoURL='mongodb://127.0.0.1:27017/Wanderlust';
const Listing=require("./models/listing.js");
const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsMate);
app.set('layout', 'layouts/boilerplate');

async function main() {
    await mongoose.connect(mongoURL);
}
main()
    .then(()=>{console.log("Database is connected")})
    .catch(err => console.log(err));



app.listen(port,()=>{
    console.log("server is working");
});

app.get('/',(req,res)=>{
    res.send("This is root page");
});

//index route
app.get('/listings',async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//new route
app.get('/listings/new',(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get('/listings/:id',async (req,res)=>{
    let id=req.params.id;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//edit route
app.get('/listings/:id/edit',async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    // res.render("listings/edit.ejs", { layout: '/layouts/boilerplate', listing });
    res.render("listings/edit.ejs",{listing});
});

//update route
app.put('/listings/:id', async(req,res)=>{
    let id=req.params.id;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete('/listings/:id', async(req,res)=>{
    let {id}=req.params;
    let deletedItem = await Listing.findByIdAndDelete(id);
    console.log(deletedItem);
    res.redirect("/listings");
});

//create route
app.post('/listings',async(req,res)=>{
    // let {title,description,price,location,country}=req.body;
    console.log(req.body);
    console.log(req.body.listing);
    const newListing=new Listing(req.body.listing);
    console.log(newListing);
    
    await newListing.save();
    res.redirect('/listings');
    // try {
    //     await newListing.save();
    //     res.redirect('/listings');
    // } catch (err) {
    //     console.error("Error saving listing:", err);
    // }
});

// app.get("/testListing",async(req,res)=>{
//     let sampleData= new Listing({
//         title:"Villa",
//         description:"owned by Billa",
//         price:10000,
//         location:"khammam",
//         country:"India",
//     });
//     await sampleData.save();
//     console.log("sample was saved");
//     res.send("data was saved in database")
// });

