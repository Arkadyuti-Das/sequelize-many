const { Sequelize, DataTypes } = require("sequelize");
 
const sequelize=new Sequelize("sequelize-tutorial", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});
 
async function main(){
    try{
        //Authenticate the connection
        await sequelize.authenticate();
        console.log("Connection has been authenticated");
 
        //Define the models
        const customerModel=await sequelize.define("customer", {
            customerName: {
                type: DataTypes.STRING
            }
        }, {
            timestamps: false
        });
 
        const productModel=await sequelize.define("product", {
            productName: {
                type: DataTypes.STRING
            }
        }, {
            timestamps: false
        });

        const junctionModel=sequelize.define("customerProduct", {
            customerProductId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        }, {
            timestamps: false
        });
 
        //Set the associations
        customerModel.belongsToMany(productModel, {through: junctionModel});
        productModel.belongsToMany(customerModel, {through: junctionModel});
 
        //Sync the models
        await sequelize.sync({alter: true});
        console.log("Models are synced");
 
        const product=await productModel.findOne({where: {productName: 'Laptop'}});
        const customers=await customerModel.findAll();
        product.addCustomers(customers);
 
        //Bulk create
        // await customerModel.bulkCreate([{customerName: 'James'}, {customerName: 'Jamie'}, {customerName: 'Tom'}, {customerName: 'Greg'}, {customerName: 'Jason'}]);
        // await productModel.bulkCreate([{productName: 'Laptop'}, {productName: 'Mobile'}, {productName: 'Headphones'}, {productName: 'Fruits'}, {productName: 'Vegetables'}]);
        // console.log("Data added");
    }
    catch(error){
        console.log("Opps! An error occurred!", error.message);
        await sequelize.close();
    }
}
 
main()