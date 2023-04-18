function createEmployeeRecord(record) {
    const employeeRecord = {};

    employeeRecord.firstName = record[0];
    employeeRecord.familyName = record[1];
    employeeRecord.title = record[2];
    employeeRecord.payPerHour = record[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];

    return employeeRecord;
}

function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord);
}

function createTimeInEvent(record, timeInStamp) {

    const timeInArray = timeInStamp.split(" ");
    const timeInObject = {};

    timeInObject.type = "TimeIn";
    timeInObject.hour = Number(timeInArray[1]);
    timeInObject.date = timeInArray[0];

    record.timeInEvents.push(timeInObject);

    return record;
}

function createTimeOutEvent(record, timeOutStamp) {

    const timeOutArray = timeOutStamp.split(" ");
    const timeOutObject = {};

    timeOutObject.type = "TimeOut";
    timeOutObject.hour = Number(timeOutArray[1]);
    timeOutObject.date = timeOutArray[0];

    record.timeOutEvents.push(timeOutObject);

    return record;
}

function hoursWorkedOnDate(record, date) {
   
    const timeInElement = record.timeInEvents.find(element => element.date === date);
    const timeOutElement = record.timeOutEvents.find(element => element.date === date);
    
    return ((timeOutElement.hour - timeInElement.hour) / 100)
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
        
    const datesWorked = [];
    for (const dateWorked in record.timeInEvents) {
        datesWorked.push(record.timeInEvents[dateWorked].date);
    }


    const allWages = datesWorked.reduce(function (accumulator, element) {
        return wagesEarnedOnDate(record, element) + accumulator;
    }, 0);

    return allWages;
}

function calculatePayroll(records) {
    return records.map(element => allWagesFor(element)).reduce(function (accumulator, element) {
        return element + accumulator;
    }, 0);
}