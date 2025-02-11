import { IonButton, IonContent, IonPage, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { COURSES, MIN_PASS } from "../common/constants";
import LessonCard from "../components/LessonCard";
import Loading from "../components/Loading";
import ProfileHeader from "../components/ProfileHeader";
import { Lesson } from "../interface/curriculumInterfaces";
import Auth from "../models/auth";
import Curriculum from "../models/curriculum";
import { OneRosterApi } from "../services/OneRosterApi";
import { Util } from "../utility/util";
import "./Profile.css";

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rewards, setRewards] = useState<any>();
  const [allLessons, setAllLessons] = useState<any>();
  const [currentCourseId, setCurrentCourseId] = useState(
    Util.getCourseByGrade(COURSES.ENGLISH)
  );
  // const [unlockUpTo, setUnlockUpTo] = useState(-1);

  useEffect(() => {
    init();
  }, []);

  async function init(subjectCode = Util.getCourseByGrade(COURSES.ENGLISH)) {
    setIsLoading(true);
    const apiInstance = OneRosterApi.getInstance();
    const tempClass = await apiInstance.getClassForUserForSubject(
      Auth.i.sourcedId,
      subjectCode
    );
    const results = await apiInstance.getResultsForStudentsForClassInLessonMap(
      tempClass?.sourcedId ?? "",
      Auth.i.sourcedId
    );
    const curriculum = Curriculum.getInstance();
    const tempLessons = await curriculum.allLessonForSubject(
      subjectCode,
      results
    );
    const lessons: Lesson[] = [];
    for (let i = 0; i < tempLessons.length; i++) {
      const lesson = tempLessons[i];
      if (lesson.type === "exam") {
        lessons.push(lesson);
      }
    }
    setRewards(results);
    setCurrentCourseId(subjectCode);
    setAllLessons(lessons);
    setIsLoading(false);
  }
  return (
    <IonPage>
      <ProfileHeader />
      <div className="tabs">
        <IonButton
          className={
            "tab " +
            (currentCourseId === Util.getCourseByGrade(COURSES.ENGLISH)
              ? " active"
              : "in-active")
          }
          color={
            currentCourseId === Util.getCourseByGrade(COURSES.ENGLISH)
              ? "success"
              : ""
          }
          fill={
            currentCourseId === Util.getCourseByGrade(COURSES.ENGLISH)
              ? "solid"
              : "outline"
          }
          onClick={async () => {
            if (currentCourseId === Util.getCourseByGrade(COURSES.ENGLISH))
              return;
            await init(Util.getCourseByGrade(COURSES.ENGLISH));
          }}
          shape="round"
        >
          English
        </IonButton>
        <IonButton
          className={
            "tab " +
            (currentCourseId === Util.getCourseByGrade(COURSES.MATHS)
              ? " active"
              : "in-active")
          }
          color={
            currentCourseId === Util.getCourseByGrade(COURSES.MATHS)
              ? "success"
              : ""
          }
          // color={"success"}
          fill={
            currentCourseId === Util.getCourseByGrade(COURSES.MATHS)
              ? "solid"
              : "outline"
          }
          onClick={async () => {
            if (currentCourseId === Util.getCourseByGrade(COURSES.MATHS))
              return;

            await init(Util.getCourseByGrade(COURSES.MATHS));
          }}
          shape="round"
        >
          Maths
        </IonButton>
      </div>
      <IonContent>
        {!isLoading ? (
          <div className="wrapper">
            {allLessons?.map((lesson: Lesson, index: number) => {
              const isPLayed =
                !!rewards[lesson.id] && rewards[lesson.id].score >= MIN_PASS;
              return (
                <LessonCard
                  width="clamp(150px,40vh,200px)"
                  height="clamp(150px,40vh,200px)"
                  lesson={lesson}
                  key={index}
                  isPlayed={isPLayed}
                  isUnlocked={isPLayed}
                  showSubjectName={false}
                  showText={false}
                  showScoreCard={false}
                  score={0}
                  toBePlayed = {false}
                />
              );
            })}
          </div>
        ) : null}
        <Loading isLoading={isLoading} />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
