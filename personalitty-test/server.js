const express = require('express')
const app = express()

// Middleware to parse JSON request bodies
app.use(express.json())
const scoringKey = [
  [2, 1, 0], // Scoring key for question 1
  [2, 1, 0], // Scoring key for question 2
  [2, 1, 0], // Scoring key for question 3
  [2, 1, 0], // Scoring key for question 4
  [2, 1, 0], // Scoring key for question 5
  [2, 1, 0], // Scoring key for question 6
  [2, 1, 0], // Scoring key for question 7
  [2, 1, 0], // Scoring key for question 8
  [2, 1, 0], // Scoring key for question 9
  [2, 1, 0], // Scoring key for question 10
]
// Responses based on the user's answer
const responses = [
  [
    'You eagerly embrace new challenges and seek creative solutions. Your proactive and innovative approach can be valuable in our dynamic startup environment, where new ideas and problem-solving are crucial.',
    'You cautiously assess new challenges before taking action. While you may not dive in immediately, your thoughtful approach ensures that you consider potential risks and benefits before proceeding.',
    "You prefer to work on tasks you are already familiar with. While this may provide stability and efficiency in certain situations, it's essential to be open to new challenges and adapt to the evolving needs of our web agency.",
  ],
  [
    'You appreciate constructive criticism and use it to improve yourself. Your ability to accept feedback positively can contribute to a culture of growth and continuous improvement within our agency.',
    "Initially, you may feel defensive but eventually consider the feedback. It's important to remain open-minded and receptive to different perspectives, as feedback can be a valuable source of learning and personal development.",
    "You find it difficult to accept criticism and may become upset. Constructive feedback is an essential part of professional growth, so it's crucial to work on developing resilience and a growth mindset to thrive in our agency's collaborative environment.",
  ],
  [
    'You take the lead and enjoy coordinating efforts. Your ability to lead and organize can be instrumental in driving successful team projects and ensuring effective collaboration among team members.',
    ' You actively participate and contribute your ideas. Your willingness to share your thoughts and engage with the team fosters creativity and diverse perspectives, which can lead to innovative solutions.',
    "You prefer to work independently and complete your own tasks. While autonomy is valuable, collaboration and teamwork are often required in our agency's projects. It may be beneficial to explore ways to enhance your teamwork skills and contribute effectively to group efforts.",
  ],
  [
    'You thrive under pressure and excel in such situations. Your ability to remain calm and focused allows you to deliver quality work even when time is limited.',
    "You remain focused and manage your time efficiently. You can handle deadlines and high-pressure situations reasonably well, but it's important to ensure that stress doesn't negatively impact your performance or well-being.",
    'You find it stressful and struggle to perform effectively under tight deadlines or high-pressure situations. It may be helpful to develop strategies to manage stress and improve your ability to work efficiently in such conditions.',
  ],
  [
    'You are flexible and easily adapt to new situations. Your adaptability allows you to embrace changes and adjust your approach accordingly, which is crucial in our fast-paced startup environment.',
    'You take time to adjust but eventually embrace change. While you may need a transitional period, your willingness to adapt is a valuable trait that can contribute to the growth and success of our agency.',
    'You struggle with change and prefer stability. Adapting to changes is an essential aspect of working in a startup web agency, so it may be beneficial to actively work on developing your flexibility and openness to new ideas.',
  ],
  [
    "You enjoy brainstorming and thinking outside the box. Your creative problem-solving skills can contribute to innovative solutions and help overcome challenges in our agency's projects.",
    'You prefer a systematic and logical approach. Your structured thinking enables you to analyze problems effectively and develop practical solutions.',
    "You rely on tried and tested methods to solve problems. While experience-based approaches can be valuable, it's also important to explore new approaches and think creatively when encountering unique challenges.",
  ],
  [
    'You are open to discussion and finding common ground. Your ability to listen, communicate effectively, and resolve conflicts constructively can foster a positive and collaborative work environment.',
    'You assert your opinions but remain respectful of others. Your willingness to express your viewpoint while maintaining professionalism can contribute to healthy debates and diverse perspectives within our agency.',
    "You avoid conflicts and prefer to keep the peace. While harmony is important, it's crucial to address conflicts when they arise, ensuring that differing opinions are heard and resolved in a constructive manner.",
  ],
  [
    'You set goals and seek new challenges to stay motivated. Your drive to achieve and continually push boundaries aligns well with the dynamic nature of our startup web agency.',
    'You enjoy collaborating with colleagues and learning from them. The social aspect of work and the opportunity to expand your knowledge and skills through interactions can keep you engaged and motivated.',
    'You find it challenging to stay motivated over time. It may be helpful to explore strategies such as goal-setting, finding personal meaning in your work, or seeking new opportunities to reignite your motivation.',
  ],
  [
    'You are highly organized and follow a strict schedule. Your ability to manage time efficiently enables you to meet deadlines and deliver work in a timely manner.',
    'You use prioritization techniques but remain adaptable. Your balance between structure and flexibility allows you to manage your tasks effectively while also being responsive to changing priorities.',
    'You struggle with time management and often feel overwhelmed. It may be beneficial to develop strategies, such as creating to-do lists or using time management tools, to enhance your organizational skills and improve productivity.',
  ],
  [
    'You view them as learning opportunities and bounce back quickly. Your resilience and ability to learn from failures can contribute to a growth mindset and an environment where mistakes are seen as opportunities for improvement.',
    'You analyze the situation to learn from your mistakes. Your reflective approach allows you to identify areas for improvement and make adjustments for future success.',
    "You find it difficult to recover from failures and may dwell on them. It's important to develop strategies to build resilience and cultivate a positive attitude towards setbacks, as they are an inherent part of professional growth and innovation.",
  ],

  // Responses for other questions...
]
let shortRes = [
  'If your total score falls within this range, it indicates a strong alignment with our startup web agency. Your high total score suggests that you possess a wide range of desirable personality traits that are well-suited for our dynamic and fast-paced environment. You have demonstrated a proactive and innovative approach to new challenges, showcasing your willingness to embrace change and seek creative solutions. Your ability to appreciate and utilize feedback suggests a growth mindset and a commitment to continuous improvement. Your active contribution to team projects, taking on leadership roles and coordinating efforts, can greatly enhance collaboration and project outcomes. Moreover, your ability to handle tight deadlines and high-pressure situations with ease showcases your resilience and ability to perform under stress. Your strong problem-solving skills, adaptability, effective conflict resolution, and self-motivation make you a valuable asset to our web agency.',
  'If your total score falls within this range, you possess a balanced mix of personality traits that make you adaptable to various situations within our startup web agency. While your total score may not be as high as the previous category, you demonstrate competencies across multiple dimensions that are crucial to our work environment. You actively participate in team projects, contributing ideas and collaborating effectively. Your ability to handle feedback, although initially defensive, indicates a willingness to consider different perspectives and learn from constructive criticism. You manage your time efficiently, prioritize tasks effectively, and remain focused, ensuring productivity and meeting deadlines. Your adaptability to changes, although it may take some time, shows your willingness to embrace new ideas and adjust your approaches accordingly. While you may not excel in every aspect, your well-rounded skill set and ability to learn from setbacks make you a valuable contributor to our startup web agency.',

  "If your total score falls within this range, you may have limitations in certain areas that are important to our startup web agency. Your lower total score suggests that you may encounter challenges in specific dimensions of your personality traits. It's important for us to carefully assess your individual scores in each dimension and consider other factors such as your skills, experience, and cultural fit when evaluating your overall fit within the organization. While you may have strengths in some areas, we need to determine if your lower scores in key dimensions, such as embracing new challenges, handling feedback, working in teams, managing tight deadlines, adapting to changes, or staying motivated, may significantly impact your performance or ability to meet the demands of our startup web agency.",
]

// Route to handle the personality test submission
app.post('/submit', (req, res) => {
  const answer = req.body
  //   res.send(answer.answers)
  // Validate the answers array length

  const answers = answer.answers
    .slice(1, -1)
    .split(',')
    .map((item) => item.trim())

  //   res.send(answers.length)
  if (answers.length !== 10) {
    res.status(400).json({ error: answers })
    return
  }
  let totalScore = 0
  // Get the appropriate response based on the user's answers
  const response = []
  for (let i = 0; i < answers.length; i++) {
    // console.log(answers[i])
    // const answerIndex = ['a', 'b', 'c'].indexOf(answers[i])
    // console.log(answerIndex)
    const arr = ['a', 'b', 'c']
    let x
    for (let j = 0; j <= 2; j++) {
      //   console.log(arr[j], answers[i])
      //   let y = "'"
      //   let z = y + arr[j] + y

      if (arr[j] === answers[i]) {
        x = j
        // console.log(x)
        break
      }
    }
    const answerIndex = x
    // console.log(x)
    // let x = answers[i]
    // const arr = ['a', 'b', 'c']
    // let x;

    // console.log(x)
    // console.log(responses[i])
    response.push(responses[i][answerIndex])
    totalScore += scoringKey[i][answerIndex]
  }
  //   console.log('total', totalScore)
  let shortAns
  if (totalScore >= 18 && totalScore <= 20) {
    shortAns = shortRes[0]
  } else if (totalScore >= 10 && totalScore <= 17) {
    shortAns = shortRes[1]
  } else {
    shortAns = shortRes[2]
  }
  res.status(200).json({
    score: totalScore,
    shortAns: shortAns,
    len: response.length,
    detailAns: response,
  })
})

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
