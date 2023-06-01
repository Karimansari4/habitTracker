const Habit = require('../models/Habit')

const getToDayDate = () => {
    let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()

    if(day < 10) day = '0' + day;
    if(month < 10) month = '0' + month;
    let today = day + '/' + month + '/' + year
    // let today = day + "/" + month + "/" + year
    return today
}

// creating habits
exports.createHabit = async(req, res) => {
    
    const content = req.body.habit

    try {
        if(!content){
            console.log("error: not found");
            return res.redirect('/', 400, {
                title: 'Habit Tracker',
                error: 'Please enter habit?'
            })
        }else{
            const habit = await Habit.findOne({content: content})
            
            if(habit){
                return res.redirect("back", 400, {
                    error: 'Habit already exists!'
                })
            }else{
                const result = await Habit.create({content: content, dates: { date: await getToDayDate(), complete: 'none'} })

                // console.log("result: ", result);
                if(result){
                    // return res.redirect('/', 200)
                    return res.redirect("/", 200, {
                        title: 'Habit Tracker',
                        success: 'Habit created successfully.'
                    })
                }else{
                    return res.render("home", {
                        title: 'Habit Tracker',
                        error: 'Failed to add new habit'
                    })
                }
            }
        }
    } catch (error) {
        console.log("error on createHabit: ", error);
    }
}

// adding favorite habit 
exports.favoriteHabit = async(req, res) => {
    const id = req.query.id
    
    try {
        const findHabit = await Habit.findOne({_id: id})
        if(findHabit){
            const updateHabit = await Habit.findOneAndUpdate({_id: id}, {favorite: findHabit.favorite ? false : true})
            if(updateHabit){
                return res.redirect("back")
            }else{
                return res.render("home", {
                    error: 'Failed to add in favorite!'
                })
            }
        }else{
            return res.render('home', {
                error: "No habit found?"
            })
        }
    } catch (error) {
        console.log("error on favoriteHabit: ", error);
    }
}


// Deleting habits
exports.deleteHabit = async(req, res) => {
    const id = req.query.id

    try {
        const result = await Habit.findByIdAndDelete(id)
        if(result){
            return res.redirect("back")
        }else{
            return res.render('home', {
                error: 'Failed to delete habit?'
            })
        }
    } catch (error) {
        console.log("error on deleteHabit: ", error);
    }
}

// update status of habit completion
exports.statusUpdate = async(req, res) => {
    const d = req.query.date
    const id = req.query.id

    Habit.findById(id).then((habit) => {
    
        let dates = habit.dates;
        let found = false;
        dates.find((item, index) => {
            if (item.date === d) {
                if (item.complete === 'yes') {
                    item.complete = 'no';
                }
                else if (item.complete === 'no') {
                    item.complete = 'none'
                }
                else if (item.complete === 'none') {
                    item.complete = 'yes'
                }
                found = true;
            }
        })
        if (!found) {
            dates.push({ date: d, complete: 'yes' })
        }
        habit.dates = dates;
        habit.save().then(habit => { res.redirect('back'); }).catch(err => console.log(err));
    
    }).catch((error) => {
        console.log("error on statusUpdate: ", error);

    })

}