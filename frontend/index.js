async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

  let mentors = await axios.get('http://localhost:3003/api/mentors')
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching mentors:', error);
    return [];
  });

  let learners = await axios.get('http://localhost:3003/api/learners')
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching learners:', error);
    return [];
  });

  // const getMentors = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3003/api/mentors');
  //     mentors = response.data;
  //   } catch (error) {
  //     console.error('Erorr fetching mentors:', error);
  //   }
  // }

  // const getLearners = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3003/api/learners');
  //     learners = response.data;
  //   } catch (error) {
  //     console.error('Erorr fetching learners:', error);
  //   }
  // };

  // const fetchData = async () => {
  //   await getMentors();
  //   await getLearners();

  //   // console.log('Mentors:', mentors) this checks that the data is correctly pulled
  //   // console.log('Learners:', learners) this also checks the data is correctly pulled
  // };

  // await fetchData();

  



  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }

  const mentorMap = mentors.reduce((map, mentor) => {
    map[mentor.id] = mentor.fullName;
    return map;
  }, {});

  learners = learners.map(learner => {
    const mentorNames = learner.mentors.map(mentorId => mentorMap[mentorId]);
    return {
      ...learner,
      mentors: mentorNames
    };
  });

  // console.log('Updated Learners:', learners)

 


  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  

  for (let learner of learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const updateInfoText = () => {
      const selectedCards = document.querySelectorAll('.learner-card.selected');
      if (selectedCards.length === 0) {
        info.textContent = 'No learner is selected';
      }
    };

    updateInfoText();

   

    const card = document.createElement('div');
    card.classList.add('learner-card');

    const heading = document.createElement('h3');
    heading.classList.add('learner-name');
    heading.textContent = learner.fullName;

    const email = document.createElement('div');
    email.classList.add('learner-email');
    email.textContent = learner.email;

    const mentorsHeading = document.createElement('h4')
    mentorsHeading.classList.add('mentors-heading');
    mentorsHeading.textContent = 'Mentors';

    const mentorsList = document.createElement('ul')
    mentorsList.classList.add('mentors-list');

    for (let mentorName of learner.mentors) {
      const mentorItem = document.createElement('li');
      mentorItem.classList.add('mentor-item');
      mentorItem.textContent = mentorName;
      mentorsList.appendChild(mentorItem);
    }

    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);



  



    

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
