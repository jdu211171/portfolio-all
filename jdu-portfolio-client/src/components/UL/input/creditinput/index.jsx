import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import cls from "./credit.module.scss"
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
]

export default function CreditInput({arr,onChange}) {
  return (
      <Autocomplete
            className={cls.Autocomplete}
    id="highlights-demo"
    sx={{ width: 300 }}
    options={arr?.map(sp => ({ id: sp?.id, lessonName: sp?.lessonName,university:sp?.university,credit:sp?.credit }))}
          getOptionLabel={(option) => {
            onChange(option?.id)
            return  option.lessonName

          }}
    renderInput={(params) => (
      <TextField {...params} label="Highlights" margin="normal" />
    )}
    renderOption={(props, option, { inputValue }) => {
      const matches = match(option.lessonName, inputValue, { insideWords: true });
      const parts = parse(option.lessonName, matches);

      return (
        <li {...props}>
          <div>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{
                  fontWeight: part.highlight ? 700 : 400,
                }}
              >
                {part.text}
              </span>
            ))}
          </div>
        </li>
      );
    }}
  />
  )
}
