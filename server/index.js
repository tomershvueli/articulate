const express = require('express')
const morgan = require('morgan')

// we'll just use some variables as the "database" to get started

const db = {
  tabBlocks: [
    {
      tabs: [
        {
          title: 'Embracing Discovery',
          description: 'Every creative endeavor requires that you take risks. If you try and don\'t succeed, you\'ve still learned something. It took Thomas Edison more than 10,000 tries to invent a viable lightbulb. You\'re not failing. You\'re discovering what doesn\'t work.',
          media: {
            type: 'image',
            url: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/q0r7xIVMCo4RkD5A.gif'
          }
        },
        {
          title: 'Gaining Insight',
          description: 'To spark creativity, feed your brain material like you\'re cramming for a tough test. Then stop thinking about the problem you want to solve. Go surfing or take a leisurely walk. Research shows that letting your mind wander fosters creativity.\n\nIt’s also found that meditation helps you spot and solve problems in creative ways. It promotes divergent thinking that gets novel ideas flowing. According to these studies, meditation also makes you more open to considering new solutions. Time to breathe.',
          media: null
        },
        {
          title: 'Making It Real',
          description: 'No creative process is truly complete until it manifests a tangible reality. Whether your idea is an action or a physical creation, bringing it to life will likely involve the hard work of iteration, testing, and refinement.\n\nJust be wary of perfectionism. Push yourself to share your creations with others. By maintaining an open stance, you’ll be able to learn from their feedback. Consider their responses new material that you can draw from the next time you’re embarking on a creative endeavor.',
          media: null
        },
        {
          title: 'Love the Work',
          description: 'Every creative endeavor requires that you take risks. If you try and don\'t succeed, you\'ve still learned something. It took Thomas Edison more than 10,000 tries to invent a viable lightbulb. You\'re not failing. You\'re discovering what doesn\'t work.',
          media: {
            type: 'image',
            url: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/kcA21C-HvSKNkEmO.png'
          }
        },
      ]
    }
  ],
  flashcardBlocks: [
    {
      cards: [
        {
          front: {
            type: 'text',
            content: 'Front of card 1'
          },
          back: {
            type: 'text',
            content: 'Back of card 1'
          }
        },
        {
          front: {
            type: 'text',
            content: 'Front of card 2'
          },
          back: {
            type: 'image',
            content: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/55J-c_DLx5JdTJ_7.jpg'
          }
        },
        {
          front: {
            type: 'text',
            content: 'Front of card 3'
          },
          back: {
            type: 'text',
            content: 'Café au lait crema so cup est single shot acerbic. Saucer as, black crema organic single origin mocha. Half and half as iced caffeine robusta wings instant. Caramelization brewed con panna, aftertaste, seasonal, froth and, a medium ristretto caramelization caffeine. Mocha crema, lungo, bar, roast in coffee that latte as grinder latte. Cortado, acerbic, grounds coffee doppio brewed sweet. Id, plunger pot single shot, filter, galão spoon blue mountain aged beans. As whipped et chicory aftertaste java robusta est half and half.'
          }
        }
      ]
    }
  ],
  knowledgeCheckBlocks:  [
    {
      id: "be80d265-8cbc-4eeb-8c45-19ee6364861d",
      question: {
        text: 'What is this a picture of?',
        media: {
          type: 'image',
          url: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/d229V-nstxA6tZdi.gif'
        }
      },
      answers: [
        {
          text: 'Cookies and coffee',
          isCorrect: true
        },
        {
          text: 'Donuts and cider',
          isCorrect: false
        }
      ],
      feedback: 'I just love cookies and a warm cup of coffee!'
    },
    {
      id: "9d044cf1-763f-44a8-aec6-77713be117df",
      question: {
        text: 'What is this a picture of? 2',
        media: {
          type: 'image',
          url: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/d229V-nstxA6tZdi.gif'
        }
      },
      answers: [
        {
          text: 'Cookies and coffee',
          isCorrect: true
        },
        {
          text: 'Donuts and cider',
          isCorrect: false
        }
      ],
      feedback: 'I just love cookies and a warm cup of coffee!'
    }
  ],
  userQuestionsState: {
    // This is where we'll save the current state of user's questions
  }
}

function server() {
  const app = express()
  const port = process.env.PORT || 5000
  app.use(express.json())

  app.use(morgan('dev'))

  // Enable CORS for all endpoints
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.get('/tab-blocks', (req, res) => res.send(db.tabBlocks))
  app.get('/flashcard-blocks', (req, res) => res.send(db.flashcardBlocks))
  app.get('/knowledge-check-blocks', (req, res) => res.send(db.knowledgeCheckBlocks))

  // We need to add some endpoints to store and retrieve the user's state

  app.get('/user-questions-state', (req, res) => {
    const { userId } = req.query;
    console.log(db.userQuestionsState); // TODO
    if (userId in db.userQuestionsState) {
      // We have requested user's questions' state
      // This is where we would implement some sort of auth system such that a user can only retrieve their own questions' state
      // In the meantime, we'll just return it as is
      res.send(db.userQuestionsState[userId]);
    } else {
      // We don't have the requested user's questions' state
      res.send({});
    }
  });

  app.put('/user-questions-state', (req, res) => {
    const { userId, questionId, questionState } = req.body;
    const curUserQuestionsState = db.userQuestionsState[userId] || {};
    const curQuestionState = curUserQuestionsState[questionId] || {};

    db.userQuestionsState = {
      ...db.userQuestionsState,
      [userId]: {
        ...curUserQuestionsState,
        [questionId]: {
          ...curQuestionState,
          ...questionState
        }
      }
    }

    res.send(200);
  });

  app.start = app.listen.bind(app, port, () => console.log(`Listening on port ${port}`))

  return app
}

if (require.main === module) server().start()

module.exports = server
