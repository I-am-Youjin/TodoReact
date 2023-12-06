import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { todosActions } from "../actions/todoActions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...todosActions,
    },
    dispatch
  );
};
