import * as express from 'express';
import * as mongoose from 'mongoose';

interface User {
  name: string;
}

const UserSchema = new mongoose.Schema<User>({
  name: String,
});

const UserModel = mongoose.model<User & mongoose.Document>('User', UserSchema);

mongoose
  .createConnection('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();

    app.use(express.json());

    app.post('/', async ({ body: { name } }, res) => {
      const user = await new UserModel({ name }).save();
      res.send(user);
    });

    app.get('/', async (req, res) => {
      res.json(await UserModel.find());
    });

    const port = 3000;
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  });
