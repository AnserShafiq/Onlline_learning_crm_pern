import { connectDB } from "../lib/db.js"

const db = connectDB()

export const getCompaniesForAgents = async(req,res) => {
    const companies = await db.query(`SELECT * FROM COMPANIES`)
    // console.log(companies.rows)
    return res.json(companies.rows)
}

export const getTimeSpent = async (req, res) => {
    try {
        if (!db) {
            throw new Error('Database connection failed.');
        }

        const { agent_id } = req.body;
        const result = await db.query('SELECT timer FROM online_timer WHERE agent_id = $1', [agent_id]);

        const oldTime = result.rows[0] || { timer: 0 };
        console.log(agent_id,"'s time => ", oldTime)
        return res.status(200).json(oldTime);
    } catch (error) {
        console.error('❌ Error fetching time spent:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateTimeSpent = async(req,res) => {
    const {time, agent_id} = req.body;
    // console.log('New Time: ', time, 'Agent ID: ', agent_id);
    if (!db) {
        throw new Error('Database connection failed.');
    }
    await db.query('UPDATE ONLINE_TIMER SET TIMER=$1 WHERE AGENT_ID=$2',[time,agent_id])
    return res.json({message: 'Time Updated'}).status(200)
}
export const addTestMarks = async(req,res) => {
    const {agent_id, marks, testNo} = req.body;
    await db.query(`CREATE TABLE IF NOT EXISTS TEST_REPORTS (
        AGENT_ID TEXT NOT NULL,
        TESTNO INT,
        MARKS INT,
        DATED TIMESTAMP
        );`)
    await db.query(`INSERT INTO TEST_REPORTS(AGENT_ID, TESTNO, MARKS, DATED) VALUES($1,$2,$3, NOW())`,[agent_id, testNo, marks])
    console.log(marks, testNo)
    return res.json({message: 'Marks added'}).status(201)
}