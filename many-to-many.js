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
 
        //Set the associations
        customerModel.belongsToMany(productModel, {through: 'customerProductModel'});
        productModel.belongsToMany(customerModel, {through: 'customerProductModel'});
 
        //Sync the models
        await sequelize.sync({alter: true});
        console.log("Models are synced");
 
        // const user=await userModel.findOne({where: {username: 'user2'}});
        // const post=await postModel.findOne();
        // await post.setUser(user);
   
 
        //Bulk create
        // await userModel.bulkCreate([{username: 'user1', password: 'abcd'}, {username: 'user2', password: 'mnop'}, {username: 'user3', password: 'qrst'}]);
        // await postModel.bulkCreate([{message: 'This is some message from me'}, {message: 'This is some message from me'}, {message: 'This is some message from me'}, {message: 'This is some message from me'}, {message: 'This is some message from me'}]);
        // console.log("Data added");
    }
    catch(error){
        console.log("Opps! An error occurred!", error.message);
        await sequelize.close();
    }
}
 
main()