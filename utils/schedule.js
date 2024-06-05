// utils/schedule.js
const { Worker, Day } = require('../db');

async function createMonthSchedule(year, month, startWorkerId) {
    const workers = await Worker.findAll();
    const startWorkerIndex = workers.findIndex(worker => worker.id === startWorkerId);
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let workerIndex = startWorkerIndex;

    for (let day = 1; day <= daysInMonth; day++) {
        await Day.create({
            date: new Date(year, month, day),
            worker_id: workers[workerIndex].id,
        });
        workerIndex = (workerIndex + 1) % workers.length;
    }
}

module.exports = { createMonthSchedule };

