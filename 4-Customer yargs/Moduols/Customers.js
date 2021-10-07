const fs = require('fs')
const validator = require('validator')


class Customers{

    static readData = () => {
        let data
        try{
            data = JSON.parse((fs.readFileSync('customers.json')))
        }catch(e) {
            data = []
        }
        return data
    }

    static writeData = (allData) => {
        try{
            fs.writeFileSync('customers.json', JSON.stringify(allData))
        }catch(e){
            return console.log(e)
        }
        return true
    }

    static findById = (id) => {
        let allCustomers = this.readData();
        let customer = allCustomers.find(customer => customer.id == id)
        return customer
    }

    static show = () => {
        let data = this.readData()
        return data
    } 

    static add = (customer) => {
        let allCustomers = this.readData()
        let {id, name, job, email} = customer

        let allawedJobs = [
            "Developer",
            "CEO",
        ]

        // Validation Condation
        if(!validator.isAlpha(name) || !validator.isIn(job, allawedJobs) || !validator.isEmail(email)) return console.log("Data Not valid") 

        let data = {
            id,
            name,
            job,
            email
        }
        
        allCustomers.push(data)
        this.writeData(allCustomers)
        console.log("add Data=>", data);
    } 

    static edit = (id) => {
        let customer = this.findById(id) 
        console.log("edit Data", customer);
    } 

    static search = (id) => {
        let customer = this.findById(id)
        console.log("Customer Data:", customer);
    } 

    static delete = (id) => {
        let allCustomer = this.readData()
        let newAllCustomer = allCustomer.filter(customer => customer.id != id)
        if(!newAllCustomer) return console.log("can't finnd") //not working
        this.writeData(newAllCustomer)
        console.log("Deleted\n New Data :", newAllCustomer)
    }

}


module.exports = {
    ...Customers,
}
