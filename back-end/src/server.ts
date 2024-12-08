import app from './app';

const port = process.env.PORT || 3008;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
