const Habit = require('../models/Habit')

const generateWeekDates = () => {
    let arr = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date()
        // d.setDate(d.getDate() + i)
        let mm = d.getMonth() + 1
        if(mm < 10) mm = "0" + mm
        let dd = d.getDate() + i
        if(dd < 10) dd = "0" + dd
        const yyyy = d.getFullYear()

        arr.push(dd + "/" + mm + "/" + yyyy)

        
        // console.log("d: ", d);
        // console.log("d.setDate(): ", d.setDate(d.getDate()+i));
        /* console.log("mm: ", mm);
        console.log("dd: ", dd); */
    }
    // console.log("arr: ", arr);
    return arr
}

exports.home = async(req, res) => {

    try {
        // console.log("generateWeekDates: ", generateWeekDates());
        const habits = await Habit.find()
        if(habits){
            return res.render("home", {
                title: "Habit Tracker",
                habits: habits,
                weeklyDate: await generateWeekDates()
            })
        }else{
            return res.render("home", {
                title: "Haibt Tracker",
                data: "No data found?"
            })
        }
    } catch (error) {
        console.log("error on home: ", error);
    }
}