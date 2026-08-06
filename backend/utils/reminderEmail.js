const cron = require("node-cron");
const Borrow = require("../models/Borrow");
const sendEmail = require("./sendEmail");


// Due date reminder job
const startReminderJob = () => {


    // TESTING: Runs every minute
    // After testing change to: "0 9 * * *" (Every day at 9 AM)

    cron.schedule("* * * * *", async () => {


        try {


            console.log("Checking due date reminders...");


            const today = new Date();


            const reminderDate = new Date();


            // Books due within next 2 days
            reminderDate.setDate(today.getDate() + 2);



            const borrowedBooks = await Borrow.find({

                status: "Borrowed",

                dueDate: {

                    $lte: reminderDate,

                    $gte: today

                }

            })
            .populate("user")
            .populate("book");




            for (const borrow of borrowedBooks) {


                await sendEmail({

                    email: borrow.user.email,

                    subject: "Library Book Due Reminder",

                    message: `

                    <h2>Library Reminder</h2>

                    <p>Hello ${borrow.user.name},</p>


                    <p>
                    Your borrowed book 
                    <b>${borrow.book.title}</b>
                    is due on 
                    <b>${borrow.dueDate.toDateString()}</b>.
                    </p>


                    <p>
                    Please return it before the due date.
                    </p>

                    `

                });



                console.log(
                    `Reminder sent to ${borrow.user.email}`
                );


            }



        } catch(error) {


            console.log(
                "Reminder Error:",
                error.message
            );


        }


    });


};


module.exports = startReminderJob;