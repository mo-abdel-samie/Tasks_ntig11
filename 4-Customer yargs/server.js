const yargs = require('yargs')

const Customers = require('./Moduols/Customers')


//show
yargs.command({
    command: "show",
    describe: "Show customers",
    handler: () => {
        let customers = Customers.show()
        console.log(customers);
    }
})

// add
yargs.command({
    command: "add",
    describe: "Add customers",
    builder:{
        id:{
            describe: "Customer ID",
            demandOption: true,
            type: "string"
        },
        name:{
            describe: "Customer Name",
            demandOption: true,
            type: "string"
        },
        job:{
            describe: "Customer Job",
            demandOption: true,
            type: "string"
        },
        email:{
            describe: "Customer Email",
            demandOption: true,
            type: "string"
        }

    },
    handler: (argv) => {
        Customers.add(argv)
    }
})

//edit
yargs.command({
    command: "edit",
    describe: "Edit customers",
    builder:{
        id:{
            describe: "Customer ID",
            demandOption: true,
            type: "string"
        },
    },
    handler: (argv) => {
        Customers.edit(argv.id)
    }
})


// shearch
yargs.command({
    command: "search",
    describe: "Search customers",
    builder:{
        id:{
            describe: "Customer ID",
            demandOption: true,
            type: "string"
        },
    },
    handler: (argv) => {
        Customers.search(argv.id)
    }
})

//delete
yargs.command({
    command: "delete",
    describe: "Delete customers",
    builder:{
        id:{
            describe: "Customer ID",
            demandOption: true,
            type: "string"
        },
    },
    handler: (argv) => {
        Customers.delete(argv.id)
    }
})

/**
 * Use 
 * yargs.argv
 * OR
 * yargs.parse() 
 * To add commands
 */

yargs.argv