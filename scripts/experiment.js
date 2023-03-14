// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {
    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
    // specify view order
    this.views_seq = [
        botcaptcha,
        intro,
        main,
        postTest,
        thanks
    ];

    main_trials = _.shuffle(main_trials)[0]

    health = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'health') {
            health.push(main_trials[i])
        }
    }

    console.log('Health! ', health)

    health = _.sampleSize(health, 2);
    console.log('Health chosen 2 ', health)

    news_journals = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'news_journals') {
            news_journals.push(main_trials[i])
        }
    }
    console.log('news_journals! ', news_journals)

    news_journals = _.sampleSize(news_journals, 2);
    console.log('news_journals chosen 2 ', news_journals)

    science_journals = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'science_journals') {
            science_journals.push(main_trials[i])
        }
    }
//    console.log('science_journals! ', science_journals)

    science_journals = _.sampleSize(science_journals, 2);
    console.log('science_journals chosen 2 ', science_journals)

    travel = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'travel') {
            travel.push(main_trials[i])
        }
    }
//    console.log('travel! ', travel)

    travel = _.sampleSize(travel, 2);
    console.log('travel chosen 2 ', travel)    

    shopping = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'shopping') {
            shopping.push(main_trials[i])
        }
    }
//    console.log('shopping! ', shopping)

    shopping = _.sampleSize(shopping, 2);
    console.log('shopping chosen 2 ', shopping)    

    social_media = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'social_media') {
            social_media.push(main_trials[i])
        }
    }
//    console.log('social_media! ', social_media)

    social_media = _.sampleSize(social_media, 2);
    console.log('social_media chosen 2 ', social_media)    

    main_trials.length = 0
    main_trials.push(...health)
    main_trials.push(...news_journals)
    main_trials.push(...science_journals)
    main_trials.push(...travel)
    main_trials.push(...shopping)
    main_trials.push(...social_media)

//    console.log('Main trials (after shuffle) in experiment.js ', main_trials)

    // prepare information about trials (procedure)
/*    cond = _.shuffle([
        'caption', 'caption', 'caption', 'caption', 'caption', 
        'caption', 'caption', 'caption', // 'caption', 'caption', 
        'description', 'description', 'description', 'description', 'description', 
        'description', 'description', 'description', // 'description', 'description',
        'generated_descr', 'generated_descr', 'generated_descr', 'generated_descr', 'generated_descr', 
        'generated_descr', 'generated_descr', 'generated_descr', // 'generated_descr', 'generated_descr', 
        'generated_capt', 'generated_capt', 'generated_capt', 'generated_capt', 'generated_capt', 
        'generated_capt', 'generated_capt', 'generated_capt' // , 'generated_capt', 'generated_capt'
    ])
    console.log(cond)
    for (i = 0; i < main_trials.length; i++) {
        main_trials[i]['condition'] = cond.pop()
    }
    console.log(main_trials)*/
//    console.log("attention_checks")
 //   console.log(attention_checks)

    // add attention checks
    main_trials.push(...attention_checks);

    // randomize main trial order, but keep practice trial order fixed
    this.trial_info.main_trials = _.shuffle(main_trials);
    console.log("Number of stimuli");
    console.log(main_trials.length);
    console.log(this.trial_info.main_trials);

    // sample question order
    shopping = "You are browsing a <strong>shopping website</strong>, with the goal of purchasing an item or experience."
    travel = "You are browsing a <strong> travel website</strong>, with the goal of traveling to a new location."
    social_media = "You are browsing <strong> social media</strong>, with the goal of learning more about your connections."
    health = "You are browsing a <strong> health website</strong>, with the goal of learning how to live a healthier lifestyle."
    science_journals = "You are browsing <strong>science magazines</strong> (such as National Geographic), with the goal of learning more about recent science developments."
    news_journals = "You are browsing <strong>news websites</strong> (such as New York Times), with the goal of learning more about recent news developments."

    questions = _.shuffle([health, shopping, travel, social_media, science_journals, news_journals])
    this.trial_info.q1 = questions.pop()
    this.trial_info.q2 = questions.pop()
    this.trial_info.q3 = questions.pop()
    this.trial_info.q4 = questions.pop()
    this.trial_info.q5 = questions.pop()
    this.trial_info.q6 = questions.pop()

    // adds progress bars to the views listed
    // view's name is the same as object's name
    this.progress_bar_in = ["main"];
    // this.progress_bar_in = ['practice', 'main'];
    // styles: chunks, separate or default
    this.progress_bar_style = "default";
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};
