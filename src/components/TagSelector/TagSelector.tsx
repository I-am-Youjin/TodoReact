import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { useActions } from "../../store/hooks/useActions";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       overflow: "hidden",
//       height: "auto",
//       wrap: "break-word",
//     },
//   },
// };

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function MultipleSelectCheckmarks() {
  const tags = useTypedSelector((state) => state.todosStore.unicTags);
  const filter = useTypedSelector((state) => state.todosStore.filter);
  const filterArr = (filter as string)?.split(", ");
  const [tagsName, setTagsName] = React.useState<string[]>([]);
  const { setFilter } = useActions();

  const handleChange = (event: SelectChangeEvent<typeof tagsName>) => {
    const {
      target: { value },
    } = event;
    setTagsName(typeof value === "string" ? value.split(", ") : value);
  };

  React.useEffect(() => {
    setFilter((tagsName as string[]).join(", "));
  }, [tagsName]);

  return (
    <div>
      <FormControl sx={{ m: 0, width: 300 }}>
        <InputLabel>Tag</InputLabel>
        <Select
          multiple
          value={tagsName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          // MenuProps={MenuProps}
          renderValue={(filterArr) => filterArr.join(", ")}
          // renderValue={(selected) => selected.join(", ")}
        >
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              <Checkbox checked={tagsName.indexOf(tag) > -1} />
              <ListItemText primary={tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
