import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../../../UL/buttun/backBtn';
import Container from '../../../UL/container';
import Person from '../../../UL/person';
import BlueButtun from '../../../UL/buttun/blueBtn';
import Avatar from 'react-avatar';
import { EmailIcons2, TelIcons2 } from '../../../UL/icons';
import cls from "./OneStudent.module.scss";

export default function OneStudent({ user, role }) {
    const router = useNavigate();
    const newDate = new Date();
    const [lessonId, setLessonId] = useState();
    const [semestorId, setsemestorId] = useState();
    const [lassonsArr, setLessonArr] = useState([]);
    const [openImg, setOpneImg] = useState(false);
    const [activeTab, setActiveTab] = useState('top'); // Добавляем стейт для активного таба
    const [activeSubTab, setActiveSubTab] = useState('pr'); // Добавляем стейт для вложенного таб
    useEffect(() => {
        if (!lessonId) {
            setLessonId(user.lessons?.[0]?.id);
        }
    }, [user.lessons]);

    useEffect(() => {
        const arr = user.lessons?.find(e => e.id == lessonId);
        setLessonArr(arr?.semesters);
        setsemestorId(arr?.semesters?.[0]?.id);
    }, [lessonId]);

    const renderSubTabContent = () => {
        switch (activeSubTab) {
            case 'pr':
                return (
                    <div>
                        <div className={cls.projectDescription}>
                            <p>
                                現在、コーワク演習科目を通じて、IT分野での作業に従事しています。HTML、CSS、JS、PHP、SQLなどの知識を習得しています。ポートフォリオの設計作業を行い、要求仕様に基づいてポートフォリオの診断、機能一覧、画面デザインを作成しました。将来的にもプログラミングのスキルを更に深く進化させたいと考えています。
                            </p>
                        </div>
                        <div className={cls.projectImages}>
                            <img src={'/Image/BigPicture.jpg'} alt='proj' />
                            <img src={'/Image/Rectangle502.png'} alt='proj' />
                        </div>
                        <div className={cls.projectDescription}>
                            <h3>趣味</h3>
                            <p>
                                異世界を旅することを想像してみてください。この物語が、彼にとっての旅行以上のものです。それぞれの場所に魅力があるとき、その地域の歴史、文化、自然の美しさを深く理解する旅を希望しています。
                            </p>
                        </div>
                        <div className={cls.projectDescription}>
                            <h3>特技</h3>
                            <p>
                                私は強力なチームを持ち、高中、高校を通じて、技術的なスキルだけでなく、チームプレーを学びました。コミュニケーション、協力、問題解決のスキルを学び、優れたチームを作り上げました。高校時代には、プロジェクトリーダーとしてチームをまとめ、複雑な案件を解決しました。
                            </p>
                        </div>
                        <div className={cls.projectDescription}>
                            <h3>資格・実績</h3>
                            <div className={cls.projectImages2}>
                                <img src="/Image/qwertyu.jpg" alt="Certificate 1" />
                                <img src="/Image/фывыфа.jpg" alt="Certificate 2" />
                            </div>
                            <div className={cls.projectDescription}>
                                <p>
                                    こちらは、私が取得した資格や実績の証明書です。これらの証明書は、私のスキルと能力を証明するものであり、これまでの努力と達成を反映しています。
                                </p>
                            </div>
                        </div>
                        <div className={cls.skillsSection}>
                            <h3>ITスキル</h3>
                            <p>上級：3年間以上　中級：1年間〜1年間半　初級：基礎</p>
                            <div className={cls.skillLevels}>
                                <div className={cls.skillLevel}>
                                    <h4>上級</h4>
                                    <div className={cls.skills}>
                                        <span className={`${cls.skill} ${cls.advanced}`}>HTML</span>
                                        <span className={`${cls.skill} ${cls.advanced}`}>CSS</span>
                                        <span className={`${cls.skill} ${cls.advanced}`}>JS</span>
                                        <span className={`${cls.skill} ${cls.advanced}`}>Bootstrap</span>
                                    </div>
                                </div>
                                <div className={cls.skillLevel}>
                                    <h4>中級</h4>
                                    <div className={cls.skills}>
                                        <span className={`${cls.skill} ${cls.intermediate}`}>Next</span>
                                        <span className={`${cls.skill} ${cls.intermediate}`}>TypeScript</span>
                                    </div>
                                </div>
                                <div className={cls.skillLevel}>
                                    <h4>初級</h4>
                                    <div className={cls.skills}>
                                        <span className={`${cls.skill} ${cls.beginner}`}>Python</span>
                                        <span className={`${cls.skill} ${cls.beginner}`}>JAVA</span>
                                        <span className={`${cls.skill} ${cls.beginner}`}>SQL</span>
                                    </div>
                                </div>
                            </div>
                            <h3>その他</h3>
                            <div className={cls.skillLevels}>
                                <div className={cls.skillLevel}>
                                    <h4>上級</h4>
                                    <div className={cls.skills}>
                                        <span className={`${cls.skill} ${cls.advanced}`}>歴史</span>
                                        <span className={`${cls.skill} ${cls.advanced}`}>国語</span>
                                        <span className={`${cls.skill} ${cls.advanced}`}>理科</span>
                                    </div>
                                </div>
                                <div className={cls.skillLevel}>
                                    <h4>中級</h4>
                                    <div className={cls.skills}>
                                        <span className={`${cls.skill} ${cls.intermediate}`}>美術</span>
                                    </div>
                                </div>
                                <div className={cls.skillLevel}>
                                    <h4>初級</h4>
                                    <div className={cls.skills}>
                                        <span className={`${cls.skill} ${cls.beginner}`}>英語</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'results':
                return (
                    <div>
                        <div className={cls.projectLinks}>
                            <div className={cls.linkItem}>
                                <span>開発経験共有：</span>
                                <a href="https://tokyo-fashion.netlify.app/" target="_blank" rel="noopener noreferrer">https://tokyo-fashion.netlify.app/</a>
                            </div>
                            <div className={cls.linkItem}>
                                <span>ソースコード：</span>
                                <a href="https://github.com/hamdamovumid/JS-tutorial" target="_blank" rel="noopener noreferrer">https://github.com/hamdamovumid/JS-tutorial</a>
                            </div>
                        </div>
                        <div className={cls.projectImage}>
                            <img src="/mnt/data/image.png" alt="Project" />
                        </div>
                        <div className={cls.projectDescription}>
                            <h3>プロジェクトの概要欄</h3>
                            <p>
                                "東京ファッション" のウェブサイトは、男性、女性、子供用のファッション商品を取り扱う小売店であることが示されています。ホーム、私たちについて、お問い合わせなどのセクションがあり、会社の情報や連絡方法について提供しているようですが、具体的な製品内容は直接見えませんでした。詳細はこちらから直接サイトを訪問してください。
                            </p>
                        </div>
                        <div className={cls.teamRoles}>
                            <ul>
                                <li>チーム開発</li>
                                <li>チームリーダー</li>
                            </ul>
                        </div>
                        <div className={cls.otherProjects}>
                            <img src="/mnt/data/image.png" alt="Other Project 1" />
                            <img src="/mnt/data/image.png" alt="Other Project 2" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'top':
                return (
                    <div>
                        <div className={cls.subTabs}>
                            <button onClick={() => setActiveSubTab('pr')} className={activeSubTab === 'pr' ? cls.active : ''}>自己PR</button>
                            <button onClick={() => setActiveSubTab('results')} className={activeSubTab === 'results' ? cls.active : ''}>成果物</button>
                        </div>
                        {renderSubTabContent()}
                    </div>
                );
            case 'qa':
                return <div>Содержание для Q&A</div>;
            case 'units':
                return <div>Содержание для 単位数とスキル</div>;
            default:
                return null;
        }
    };

    return (
        <div className={cls.OneStudent}>
            <Container>
                <div className={cls.OneStudent__Wrap1}>
                    {role != 'student' ? <BackBtn onClick={(e) => router(-1)} role={true} UserId={user?.id} style={{ maxWidth: "100%" }} /> : ""}
                    {
                        role && role === "decan" ?
                            <BlueButtun
                                light={true}
                                className={cls.OneStudent__btn}
                                onClick={() => router(`/${role}/studentsSet/${user?.id}`)}
                            >
                                プロフィール編集
                            </BlueButtun> :
                            ""
                    }
                </div>
                <div className={cls.OneStudent__Wrap}>
                    <Person
                        id={user?.loginId}
                        name={`${user?.firstName} ${user?.lastName}`}
                        avatar={user?.avatar}
                        year={newDate.getFullYear() - user.brithday?.split('-')[0] + "歳"}
                        email={user?.email}
                        role={role}
                    />
                    <div style={{ width: "100%", }}>
                        {
                            role === "student" ?
                                <BlueButtun
                                    light={true}
                                    className={cls.OneStudent__btn}
                                    onClick={() => router(`/student/studentsSet/${user?.id}`)}
                                >
                                    プロファイル編集
                                </BlueButtun> : ""
                        }


                    </div>
                </div>
                {
                    role !== "parent" && user?.Parents?.[0]?.isActive ? user?.Parents?.length ? <div className={cls.OneStudent__person}>
                        <div className={cls.OneStudent__person__box} onClick={() => router(`/decan/parents/${user?.Parents?.[0]?.id}`)}>
                            {user?.Parents?.[0]?.avatar ? <img
                                src={user?.Parents?.[0]?.avatar}
                                width={64}
                                height={65}
                                alt={"img"}
                                style={{ borderRadius: "50%", objectFit: "cover" }}
                            /> :
                                <Avatar name={`${user?.Parents?.[0]?.firstName} ${user?.Parents?.[0]?.lastName}`} size="64" round={64} />
                            }
                            <div className={cls.OneStudent__person__dv}>
                                <p className={cls.OneStudent__person__text}>{user?.Parents?.[0].firstName} {user?.Parents?.[0].lastName}</p>
                                <p className={cls.OneStudent__person__id}>ID:{user?.Parents?.[0].loginId}</p>
                            </div>
                        </div>
                        <a href={`mailto:${user?.Parents?.[0].email}`} > <EmailIcons2 />
                            <p>{user?.Parents?.[0].email}</p>
                        </a>
                        <a href="#"> <TelIcons2 /> {user?.Parents?.[0].phoneNumber}</a>
                    </div> : "" : ""
                }
                <div>
                </div >
                <div className={cls.OneStudent__tabs}>
                    <button onClick={() => setActiveTab('top')} className={activeTab === 'top' ? cls.active : ''}>トップ</button>
                    <button onClick={() => setActiveTab('qa')} className={activeTab === 'qa' ? cls.active : ''}>Q&A</button>
                    <button onClick={() => setActiveTab('units')} className={activeTab === 'units' ? cls.active : ''}>単位数とスキル</button>
                </div>
                <div className={`${cls.OneStudent__content} ${role !== "parent" && user?.Parents?.[0]?.isActive && user?.Parents?.length ? cls.margin : ""}`}>
                    {renderContent()}
                </div>
            </Container >
        </div >
    );
}
