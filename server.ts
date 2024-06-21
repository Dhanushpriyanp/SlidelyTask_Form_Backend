import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send(true);
});

app.post('/submit', async (req, res) => {
    const newSubmission = req.body;
    try {
        const db = JSON.parse(await fs.promises.readFile(dbFilePath, 'utf8'));
        db.submissions.push(newSubmission);
        await fs.promises.writeFile(dbFilePath, JSON.stringify(db, null, 2));
        res.send('Submission received');
    } catch (error) {
        res.status(500).send('Error writing submission');
    }
});

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

const initializeFile = async () => {
    try {
        if (!fs.existsSync(dbFilePath)) {
            await fs.promises.writeFile(dbFilePath, JSON.stringify({ submissions: [] }));
        }
    } catch (error) {
        console.error('Error initializing file:', error);
    }
};

const readData = async (): Promise<{ submissions: Submission[] }> => {
    const retries = 2; // Number of attempts
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const data = await fs.promises.readFile(dbFilePath, 'utf8');
            return JSON.parse(data) as { submissions: Submission[] };
        } catch (error) {
            console.error(`Error reading file (attempt ${attempt}):`, error);
            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, 10)); // Wait 0.01 second before retrying
            }
        }
    }
    // Ensure that the function always returns an object with the submissions array
    return { submissions: [] };
};

const writeData = async (data: { submissions: Submission[] }) => {
    try {
        await fs.promises.writeFile(dbFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing to file:', error);
    }
};

app.get('/read', async (req, res) => {
    try {
        const submissions = await readData();
        res.json(submissions);
    } catch (error) {
        res.status(500).send('Error reading submissions');
    }
});

// Additional features

app.delete('/delete/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const data = await readData();
        const submissions = data.submissions.filter(sub => sub.email !== email);
        await writeData({ submissions });
        res.status(200).send('Submission deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting submission');
    }
});

app.put('/edit/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const newSubmission = req.body as Submission;
        const data = await readData();
        const submissions = data.submissions.map(sub => sub.email === email ? newSubmission : sub);
        await writeData({ submissions });
        res.status(200).send('Submission updated successfully');
    } catch (error) {
        res.status(500).send('Error updating submission');
    }
});

app.get('/search', async (req, res) => {
    try {
        const { email } = req.query;
        const data = await readData();
        const submission = data.submissions.find(sub => sub.email === email);
        if (submission) {
            res.json(submission);
        } else {
            res.status(404).send('Submission not found');
        }
    } catch (error) {
        res.status(500).send('Error searching submissions');
    }
});

// Initialize file before starting the server
(async () => {
    await initializeFile();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})();
