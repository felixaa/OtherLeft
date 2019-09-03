import { useCallback } from 'react';
import { mapValues } from 'lodash';
import { useDispatch } from 'redux-react-hook';

export function useMappedActions(actionsObject) {
  const dispatch = useDispatch();

  return mapValues(actionsObject, value =>
    useCallback(x => dispatch(value(x)), [])
  );
}
