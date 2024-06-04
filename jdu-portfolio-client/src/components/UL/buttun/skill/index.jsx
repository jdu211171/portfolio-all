import cls from "./skillButtun.module.scss"

export default function SkillBtn({ name, color, backround }) {
    return (
        <p className={cls.SkillBtn} style={{ color: color, border: `1px solid ${color}`, }}>
            {name}
            <div style={{ backgroundColor: backround }} className={cls.background} ></div>
        </p>
    )
}
