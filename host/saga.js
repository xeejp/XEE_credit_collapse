import { fork, take, put } from 'redux-saga/effects';

function* startCountUp(getState, prize) {
  const id = setInterval(() => {
    sendData('updatePrize', {prize: ++ prize});
    const { limit } = getState()
    if (prize >= limit) {
      sendData('exitAll')
      clearInterval(id);
    }
  }, 1000);
  yield take('STOP');
  clearInterval(id);
}

function* updatePrize(getState) {
  while (true) {
    yield take('START');
    yield fork(startCountUp, getState, 0);
  }
}

function* continueExperiment(getState) {
  const contents = yield take('UPDATE_CONTENTS')
  const { started } = contents;
  let { prize } = contents;
  if (started) {
    yield fork(startCountUp, getState, prize);
  }
}

function* exitAutomatically(getState) {
  while (true) {
    yield take('START')
    const { experiment_type, exitFunction, prize } = getState()
    console.log(experiment_type)
    if (experiment_type == "no_interaction"
      || experiment_type == "no_interaction_and_information"
        || experiment_type == "no_interaction_with_optimal") {
      const id = setInterval(() => {
        const users = exitFunction(prize)
        for (let i = 0; i < users; i ++) {
          setTimeout(() => {
            sendData('exit')
          }, Math.floor(Math.random() * 1000))
        }
      }, 1000);
      yield take('STOP');
      clearInterval(id);
    }
  }
}

export default function* saga(getState, dispatch) {
  yield fork(updatePrize, getState);
  yield fork(continueExperiment, getState);
  yield fork(exitAutomatically, getState);
}
