import { Select } from "antd"
import cls from "./SearchSkill.module.scss"

export default function SearchSkill({ label, skill, onChange, placeholder, ...other }) {
    return (
        <label className={cls.SearchSkill} {...other}>
            {label && <p className={cls.SearchSkill__label}>{label}</p>}
            <Select
                className={cls.SearchSkill__Select}
                defaultValue={placeholder}
                style={{ width: "100%", }}
                onChange={onChange}
                options={skill?.map(sp => ({ value: sp.id, label: sp.name }))}
            />
        </label>
    )
}

