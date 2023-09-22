const Product=require('../models/product')

const getAllProductsStatic=async (req,res)=>{
    //throw new Error("tryagain")
    //const search="ab"
    //const product= await Product.find({name:{$regex:search,$options:'i'}}) //passing object

    //const product= await Product.find({}).sort('name') //requesting all product in sorted order by name and('-name') will give alter the  sorting order)

    // const product= await Product.find({}).sort('name price') //sort by name but if same name then sort by price

    //const product= await Product.find({}).sort('name').select('name price') //print only the name and price in sorted by name
    const product= await Product.find({price:{$gt:30}})
    .sort('name')
    .select('name price')
    res.status(200).json({product,nbhits:product.length})
}
const getAllProducts=async (req,res)=>{
    const {featured,company,sort,numericFilters}=req.query //from multiple params it  wiill consider only featured
    const queryObject={}
    if(featured)
    {
        queryObject.featured=featured==='true'?true:false
    }
    if(company)
    {
        queryObject.company={$regex:company,$options:'i'}
    }
    if(numericFilters)
    {
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx=/\b(<|>|>=|=|<|<=)\b/g
        let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)

        const options=['price','rating'];
        filters=filters.split(',').forEach((item)=>{
            const [field,operator,value]=item.split('-')
            if(options.includes(field)){
                queryObject[field]={[operator]:Number(value)}
            }
        })
    }
    let result = Product.find(queryObject)
     //shedule the the function call
    //check if user passed the sort

    if(sort)
    {
        //similar like (name price) first breaks on ","then join with space (" ")
        const sortlist=sort.split(',').join(' '); 
        result=result.sort(sortlist) 
    }
    else{
        result=result.sort('createdAt')
    }
    const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||10
    const skip=(page -1)*limit;

    result=result.skip(skip).limit(limit)
    const product=await result
    res.status(200).json({product})
}
module.exports={getAllProductsStatic,getAllProducts}

//we can use .limit(integer) to get limited number of pages
//we can use .skip(integer) to get element after skipping the given number of elements
//for numeric filetrs we use $gt:integer for greater than