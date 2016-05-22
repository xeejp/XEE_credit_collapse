import { fork, take, put } from 'redux-saga/effects';

function* updatePrize() {
  while (true) {
    yield take('START');
    let prize = 0;
    const id = setInterval(() => {
      sendData('updatePrize', {prize: ++ prize});
    }, 1000);
    yield take('STOP');
    clearInterval(id);
  }
}

function* continueExperiment() {
  const contents = yield take('UPDATE_CONTENTS')
  const { started } = contents;
  let { prize } = contents;
  if (started) {
    const id = setInterval(() => {
      sendData('updatePrize', {prize: ++ prize});
    }, 1000);
    yield take('STOP');
    clearInterval(id);
  }
}

export default function* saga() {
  yield fork(updatePrize);
  yield fork(continueExperiment);
}
