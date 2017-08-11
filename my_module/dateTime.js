(function (module) {
    'use strict';

    var moment       = require('moment');
    var momentJalali = require('moment-jalaali');

    function dateTime() {
    }

    dateTime.getJalaliFormat = function () {
        return "jYYYY-jMM-jDD";
    };

    dateTime.getGeorgianFormat = function () {
        return "YYYY-MM-DD";
    };

    dateTime.getTimeFormat = function () {
        return "HH:mm:ss";
    };

    dateTime.getTurn = function () {

        var time = moment().format("HH:mm");

        var time_cycle = {
            "morning": moment("08:00", "HH:mm"),
            "afternoon": moment("17:00", "HH:mm")
        };

        if (String(time) >= time_cycle.morning && String(time) <= time_cycle.afternoon) {
            return 'morning';
        }

        if (!(String(time) >= time_cycle.morning && String(time) <= time_cycle.afternoon)) {
            return 'afternoon';
        }
    };

    dateTime.toJalali = function (date, format) {
        format = format || this.getJalaliFormat();
        return String(momentJalali(date).format(format));
    };

    dateTime.toGeorgian = function (date, inputDateFormat, format) {
        format          = format || this.getGeorgianFormat();
        inputDateFormat = inputDateFormat || this.getJalaliFormat();
        return String(momentJalali(date, inputDateFormat).format(format));
    };

    dateTime.checkDateGeorgian = function (Newsdate) {
        return moment().diff(Newsdate, 'days') === 0;
    };

    dateTime.checkDateJalali = function (Newsdate) {
        Newsdate = this.toGeorgian(Newsdate);
        return this.checkDateGeorgian(Newsdate);
    };

    dateTime.checkTime = function (time, turn) {

        time = moment(time, "HH:mm");

        var time_cycle = {
            "morning": moment("08:00", "HH:mm"),
            "afternoon": moment("17:00", "HH:mm")
        };

        if (turn == 'morning') {
            return time >= time_cycle.morning && time <= time_cycle.afternoon;
        }

        if (turn == 'afternoon') {
            return !(time >= time_cycle.morning && time <= time_cycle.afternoon);
        }

        return false;
    };

    dateTime.currentTime = function () {
        return momentJalali().format(this.getTimeFormat());
    };

    dateTime.currentDateJalali = function () {
        return momentJalali().format(this.getJalaliFormat());
    };

    dateTime.currentDateGeorgian = function () {
        return moment().format(this.getGeorgianFormat());
    };

    dateTime.convertFormatGeorgian = function (date, inputDateFormat, format) {
        format          = format || this.getGeorgianFormat();
        inputDateFormat = inputDateFormat || this.getJalaliFormat();
        return String(moment(date, inputDateFormat).format(format));
    };

    dateTime.convertFormatJalali = function (date, inputDateFormat, format) {
        format          = format || this.getJalaliFormat();
        inputDateFormat = inputDateFormat || this.getGeorgianFormat();
        return String(momentJalali(date, inputDateFormat).format(format));
    };

    dateTime.isGeorgianDate = function (date, format) {
        format = format || this.getGeorgianFormat();
        return moment(date, format, true).isValid();
    };

    dateTime.isJalaliDate = function (date, format) {
        format = format || this.getJalaliFormat();
        return moment(date, format, true).isValid();
    };

    dateTime.isTime = function (date, format) {
        format = format || this.getTimeFormat();
        return moment(date, format, true).isValid();
    };

    for (var prop in dateTime) {
        if (dateTime.hasOwnProperty(prop)) {
            module.exports[prop] = dateTime[prop];
        }
    }
})(module);
