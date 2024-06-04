import cls from './RightAsideWrapper.module.scss'

export default function RightAsideWrapper({ children, ...other }) {
    return (
        <div className={cls.aside} {...other}>
            {children}
        </div>
    );
}