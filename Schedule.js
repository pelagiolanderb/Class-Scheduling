class Schedule {
	constructor(subject, teacher, date, time, duration) {
		this.subject = subject;
		this.teacher = teacher;
		this.date = date;
		this.time = time;
		this.duration = duration;
	}
}

$(document).ready(function() {

	const months = [ "January", "February", "March", "April", "May", "June", "July", "August", 
					 "September", "October", "November", "December", ];

	const date = new Date();

	let currentDate = $("#currentDate");
	let subject = $("input[name = subject]");
	let teacher = $("input[name = teacher]");
	let hour = $("input[name = hour]");
	let minutes = $("input[name = minutes]");
	let month = $("select[name = months");
	let day = $("select[name = days");
	let year = $("input[name = year]");
	let fullDate;
	let schedule;
	let arrSchedule = [];

	loadDefaults();
	// displayTable();
	setMonthsMenu();
	setDaysMenu();

	$("#saveSchedule").click(function() {
		if(minutes.val() == "" || hour.val() == "" || subject.val() == "" || teacher.val() == "") {
			alert("Please complete the input fields!");
		}else {
			if(minutes.val() < 10 && hour.val() < 10) {
				$("#time").text(`0${hour.val()}:0${minutes.val()}`);
			}else if(minutes.val() < 10) {
				$("#time").text(`${hour.val()}:0${minutes.val()}`);
			}else if(hour.val() < 10) {
				$("#time").text(`0${hour.val()}:${minutes.val()}`);
			}else {
				$("#time").text(`${hour.val()}:${minutes.val()}`);
			}

			let time = $("#time").text();
			let duration = time;

			fullDate = `${month.val()} ${day.val()}, ${year.val()}`;

			$("#date").text(fullDate);
			$("#subject").text(subject.val());
			$("#teacher").text(teacher.val());
			$("#duration").text(time);
			setToDefault();
			$("#display").prop("disabled", false);
			$("#saveSchedule").prop("disabled", true);
		}
	});

	$("#display").click(function() {
		let getSubject = $("#subject").text();
		let getTeacher = $("#teacher").text();
		let getDate = $("#date").text();
		let getTime = $("#time").text();
		let getDuration = $("#duration").text();

		schedule = new Schedule(getSubject, getTeacher, getDate, getTime, getDuration);
		arrSchedule.push(schedule);

		let serializedObj = JSON.stringify(arrSchedule);

		localStorage.setItem("tblSchedule", serializedObj);

		displayTable();

		alert("Your schedule has been display in home page.");

		$("#display").prop("disabled", true);
		$("#saveSchedule").prop("disabled", false);

		$("#cancel").click(function() {
			$("#cancel").parents("tr").remove();
			alert("Schedule Cancelled!");
		});

		$("#resched").click(function() {
			console.log("same rito gumana ka naman na please!!!!!");
		});
	});

	$("#log-in").click(function() {
		let email = $("input[type = text]").val();
		let password = $("input[type = password]").val();
		if(email == "admin" && password == "pass") {
			alert("Logged In!");
			homePage();
		}else {
			alert("Wrong Credentials, the credentials, by default, must be.. \n email = admin \n password = pass");
			$("input[type = text]").val("");
			$("input[type = password]").val("");
			$("input[type = text]").focus();
		}
	});

	$("#home").click(function() {
		goToHome();
	});

	$("#schedule").click(function() {
		$(".displayed-schedule-container").css("display", "none");
		$(".num-schedule-container").css("display", "none");
		$(".profile-container").css("display", "none");
		$(".help-feedback-container").css("display", "none");
		$(".schedule-container").css("display", "flex");
		$(".setting-container").css("display", "none");
	});

	$("#profile").click(function() {
		$(".displayed-schedule-container").css("display", "none");
		$(".num-schedule-container").css("display", "none");
		$(".profile-container").css("display", "flex");
		$(".help-feedback-container").css("display", "none");
		$(".schedule-container").css("display", "none");
		$(".setting-container").css("display", "none");
	});

	$("#setting").click(function() {
		$(".displayed-schedule-container").css("display", "none");
		$(".num-schedule-container").css("display", "none");
		$(".profile-container").css("display", "none");
		$(".help-feedback-container").css("display", "none");
		$(".schedule-container").css("display", "none");
		$(".setting-container").css("display", "flex");
	});

	$("#help-feedback").click(function() {
		$(".displayed-schedule-container").css("display", "none");
		$(".num-schedule-container").css("display", "none");
		$(".profile-container").css("display", "none");
		$(".help-feedback-container").css("display", "block");
		$(".schedule-container").css("display", "none");
		$(".setting-container").css("display", "none");
	});

	$("#view-schedule").click(function() {
		goToHome();
	});

	$("#log-out").click(function() {
		goToLogIn();
	});

	$(".prev").click(function() {
		date.setMonth(date.getMonth() - 1);
		renderCalendar();
	});

	$(".next").click(function() {
		date.setMonth(date.getMonth() + 1);
		renderCalendar();
	});

	function loadDefaults(){
        if(localStorage.length > 0){
            displayTable();

            arrSchedule = JSON.parse(localStorage.getItem("tblSchedule"));
        }else{
            localStorage.setItem("tblSchedule", null);
        }
    }

	function displayTable(){
        let deserializedObj = JSON.parse(localStorage.getItem("tblSchedule"));

        $("#tblSchedule").html("");

        deserializedObj.forEach(function(item, index) {
        	let instance = new Schedule();

        	let tr = $("<tr></tr>");

            let checkbox = "<input type = \"checkbox\">";
            let buttonCancel = $("<button></button>").text("Cancel").attr("id", "cancel");
			let buttonReSched = $("<button></button>").text("Reschedule").attr("id", "resched");
            Object.assign(instance, deserializedObj[index]);
            deserializedObj[index] = instance;

            let td1 = $("<td></td>").append(checkbox);
            let td2 = $("<td></td>").text(instance.date);
            let td3 = $("<td></td>").text(instance.time);
            let td4 = $("<td></td>").text(instance.subject);
            let td5 = $("<td></td>").append(buttonCancel, buttonReSched);

            tr.append(td1, td2, td3, td4, td5);
            $("#tblSchedule").append(tr);
        });
    }

	function goToHome() {
		$(".displayed-schedule-container").css("display", "block");
		$(".num-schedule-container").css("display", "block");
		$(".profile-container").css("display", "none");
		$(".help-feedback-container").css("display", "none");
		$(".schedule-container").css("display", "none");
		$(".setting-container").css("display", "none");
	}

	function goToLogIn() {
		alert("Logged Out!");
		$(".displayed-schedule-container").css("display", "none");
		$(".num-schedule-container").css("display", "none");
		$(".profile-container").css("display", "none");
		$(".help-feedback-container").css("display", "none");
		$(".schedule-container").css("display", "none");
		$(".setting-container").css("display", "none");
		$("ul").css("display", "none");
		$(".log-in-container").css("display", "block");
	}

	function homePage() {
		$(".log-in-container").css("display", "none");
		$("ul").css("display", "block");
		$(".displayed-schedule-container").css("display", "block");
		$(".num-schedule-container").css("display", "block");
	}

	function renderCalendar() {
		date.setDate(1);

		const lastDay = new Date(
				date.getFullYear(),
				date.getMonth() + 1,
				0
			).getDate();

		const prevLastDay = new Date(
				date.getFullYear(),
				date.getMonth(),
				0
			).getDate();

		const firstDayIndex = date.getDay();

		const lastDayIndex = new Date(
				date.getFullYear(),
				date.getMonth() + 1,
				0
			).getDay();

		const nextDays = 7 - lastDayIndex - 1;

		$(".date h1").text(months[date.getMonth()]);
		$(".date p").text(new Date().toDateString());

		let days = "";

		for (let x = firstDayIndex; x > 0; x--) {
			days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
		}

		for (let i = 1; i <= lastDay; i++) {
			if (i === new Date().getDate() &&
				date.getMonth() === new Date().getMonth()
			) {
				days += `<div class="today">${i}</div>`;
			} else {
				days += `<div>${i}</div>`;
			}
		}

		for (let j = 1; j <= nextDays; j++) {
			days += `<div class="next-date">${j}</div>`;
			$(".days").html(days);
		}
	};

	function setMonthsMenu() {
		months.forEach(function(item) {
			let option = `<option value="${item}">${item}</option>`;
			$("#months").append(option);
		});
	}

	function setDaysMenu() {
		for(let day = 1; day <= 31; day++) {
			let option = `<option value="${day}">${day}</option>`;
			$("#days").append(option);
		}
	}

	function setToDefault() {
		subject.val("");
		teacher.val("");
		hour.val("");
		minutes.val("");
		year.val("");
	}

	renderCalendar();
});