var botcaptcha = {
    name: "botcaptcha",
    title: "Are you a bot?",
    buttonText: "Let's go!",
    render: function(){
        var viewTemplate = $("#botcaptcha-view").html();

        // define possible speaker and listener names
        // fun fact: 10 most popular names for boys and girls
        var speaker = _.shuffle(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"])[0];
        var listener = _.shuffle(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"])[0];

        var story = speaker + ' says to ' + listener + ': "It\'s a beautiful day, isn\'t it?"'

        $("#main").html(
            Mustache.render(viewTemplate, {
                name: this.name,
                title: this.title,
                text: story,
                question: "Who is " + speaker + " talking to?",
                button: this.buttonText
            })
        );

        // don't allow enter press in text field
        $('#listener-response').keypress(function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });

        // don't show any error message
        $("#error").hide();
        $("#error_incorrect").hide();
        $("#error_2more").hide();
        $("#error_1more").hide();

        // amount of trials to enter correct response
        var trial = 0;

        $("#next").on("click", function() {
            response = $("#listener-response").val().replace(" ","");

            // response correct
            if (listener.toLowerCase() == response.toLowerCase()) {
                exp.global_data.botresponse = $("#listener-response").val();
                exp.findNextView();

            // response false
            } else {
                trial = trial + 1;
                $("#error_incorrect").show();
                if (trial == 1) {
                    $("#error_2more").show();
                } else if (trial == 2) {
                    $("#error_2more").hide();
                    $("#error_1more").show();
                } else {
                    $("#error_incorrect").hide();
                    $("#error_1more").hide();
                    $("#next").hide();
                    $('#quest-response').css("opacity", "0.2");
                    $('#listener-response').prop("disabled", true);
                    $("#error").show();
                };
            };
            
        });

    },
    trials: 1
};

var intro = {
    name: "intro",
    // introduction title
    title: "Stanford NLP Lab",
    // introduction text
    text:
        "Thank you for participating in our study. In this study, you will see 14 pictures and, for each image, you will rate how likely it is that you come across this image in different scenarios. The whole HIT should take about 13 minutes. Please only participate once in this series of HITs.<br>Please do <strong>not</strong> participate on a mobile device since the page won't display properly.<br><small>If you have any questions or concerns, don't hesitate to contact me at nanditan@stanford.edu</small>",
    legal_info:
        "<strong>LEGAL INFORMATION</strong>:<br><br>We invite you to participate in a research study on language production and comprehension.<br>Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game.<br><br>You will be paid for your participation at the posted rate.<br><br>There are no risks or benefits of any kind involved in this study.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study.<br>You may print this form for your records.<br><br>CONTACT INFORMATION:<br>If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at <br>(650)-725-9336<br><br>If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.",
    // introduction's slide proceeding button text
    buttonText: "Begin experiment",
    // render function renders the view
    render: function() {
        var viewTemplate = $("#intro-view").html();

        $("#main").html(
            Mustache.render(viewTemplate, {
                picture: "images/stanford_nlp_group.jpeg",
                title: this.title,
                text: this.text,
                legal_info: this.legal_info,
                button: this.buttonText
            })
        );

        var prolificId = $("#prolific-id");
        var IDform = $("#prolific-id-form");
        var next = $("#next");

        var showNextBtn = function() {
            if (prolificId.val().trim() !== "") {
                next.removeClass("nodisplay");
            } else {
                next.addClass("nodisplay");
            }
        };

        if (config_deploy.deployMethod !== "Prolific") {
            IDform.addClass("nodisplay");
            next.removeClass("nodisplay");
        }

        prolificId.on("keyup", function() {
            showNextBtn();
        });

        prolificId.on("focus", function() {
            showNextBtn();
        });

        // moves to the next view
        next.on("click", function() {
            if (config_deploy.deployMethod === "Prolific") {
                exp.global_data.prolific_id = prolificId.val().trim();
            }

            exp.findNextView();
        });
    },
    // for how many trials should this view be repeated?
    trials: 1
};

var main = {
    name: "main",
    render: function(CT) {
        // fill variables in view-template
        var viewTemplate = $("#main-view").html();

        console.log("Main trials ", exp.trial_info.main_trials)

        console.log("Current trial ", exp.trial_info.main_trials[CT])
        console.log("CT index ", CT)

        console.log("Picture name ", "images/" + exp.trial_info.main_trials[CT]['filename'])

        text = "How likely is it that you come across this image while doing the following activities?"

        checkbox = 'Can\'t say because the image does not match with any scenarios.';

        slider_left = 'Not likely';
        slider_right = 'Likely';

        $("#main").html(
            Mustache.render(viewTemplate, {
                critical_text: text,
                picture: "images/" + exp.trial_info.main_trials[CT]['filename'],
                slider_left: slider_left,
                slider_right: slider_right,
                q1: exp.trial_info.q1,
                q2: exp.trial_info.q2,
                q3: exp.trial_info.q3,
                q4: exp.trial_info.q4,
                q5: exp.trial_info.q5,
                q6: exp.trial_info.q6
//                checkbox: checkbox
            })
        );

        window.scrollTo(0,0);

        var slider1 = $('#slider1');
        var slider1_changed = false;
        slider1.on('click', function() {
            slider1_changed = true;
            $("#error").css({"visibility": "hidden"});
            // console.log("Yey, you changed slider 1");
        });

        var slider2 = $('#slider2');
        var slider2_changed = false;
        slider2.on('click', function() {
            slider2_changed = true;
            $("#error").css({"visibility": "hidden"});
            // console.log("Yey, you changed slider 2");
        });

        var box_checked = false;
        $('input[id=checkbox]').change(function(){
            if($(this).is(':checked')) {
                box_checked = true;
                $('#questions').css("opacity", "0.2");
                $("#error").css({"visibility": "hidden"});
                // console.log("Yey, you checked the box!");
                // console.log("$('#checkox')");
                // console.log($('#checkbox').prop('checked'));
            } else {
                box_checked = false;
                // if (exp.trial_info.q1 == 'replacement') {
                //     $('#slider2_box').css("opacity", "1");
                // } else {
                //     $('#slider1_box').css("opacity", "1");
                // }
                $('#questions').css("opacity", "1");
                // console.log("Yey, you unchecked the box!");
                // console.log("$('#checkox')");
                // console.log($('#checkbox').prop('checked'));
            }
        });

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $("#next").on("click", function() {
            if ((slider1_changed & slider2_changed) || box_checked) {
                var RT = Date.now() - startingTime; // measure RT before anything else
                var trial_data = {
                    trial_number: CT + 1,
                    picture: "images/" + exp.trial_info.main_trials[CT]['filename'],
//                    q1_type: exp.trial_info.q1,
//                    q2_type: exp.trial_info.q2,
                    q1: exp.trial_info.q1,
                    q2: exp.trial_info.q2,
                    q3: exp.trial_info.q3,
                    q4: exp.trial_info.q4,
                    q5: exp.trial_info.q5,
                    q6: exp.trial_info.q6,
                    q1_sliderval: $('#slider1').val(),
                    q2_sliderval: $('#slider2').val(),
                    q3_sliderval: $('#slider3').val(),
                    q4_sliderval: $('#slider4').val(),
                    q5_sliderval: $('#slider5').val(),
                    q6_sliderval: $('#slider6').val(),
                    //                    checkbox: $('#checkbox').prop('checked'),
                    comments: $('#comments').val()
                };
                console.log('Trial data ', trial_data)

                exp.trial_data.push(trial_data);
                exp.findNextView();
            } else {
                console.log($("#error"));    
                $("#error").css({"visibility": "visible"});
            };
        });

        // record trial starting time
        var startingTime = Date.now();
    },
    trials: 14
};

var postTest = {
    name: "postTest",
    title: "Additional Info",
    text:
        "Answering the following questions is optional, but will help us understand your answers.",
    buttonText: "Continue",
    render: function() {
        var viewTemplate = $("#post-test-view").html();
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title,
                text: this.text,
                buttonText: this.buttonText
            })
        );

        $("#next").on("click", function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.HitCorrect = $("#HitCorrect").val();
            exp.global_data.age = $("#age").val();
            exp.global_data.gender = $("#gender").val();
            exp.global_data.education = $("#education").val();
            exp.global_data.languages = $("#languages").val();
            exp.global_data.enjoyment = $("#enjoyment").val();
            exp.global_data.comments = $("#comments")
                .val()
                .trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent =
                (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        });
    },
    trials: 1
};

var thanks = {
    name: "thanks",
    message: "Thank you for taking part in this experiment!",
    render: function() {
        var viewTemplate = $("#thanks-view").html();

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if (
            config_deploy.is_MTurk ||
            config_deploy.deployMethod === "directLink"
        ) {
            // updates the fields in the hidden form with info for the MTurk's server
            $("#main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message
                })
            );
        } else if (config_deploy.deployMethod === "Prolific") {
            $("main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message,
                    extraMessage:
                        "Please press the button below to confirm that you completed the experiment with Prolific<br />" +
                        "<a href=" +
                        config_deploy.prolificURL +
                        ' class="prolific-url">Confirm</a>'
                })
            );
        } else if (config_deploy.deployMethod === "debug") {
            $("main").html(Mustache.render(viewTemplate, {}));
        } else {
            console.log("no such config_deploy.deployMethod");
        }

        exp.submit();
    },
    trials: 1
};
