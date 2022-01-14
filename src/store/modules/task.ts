import { Assignee, TaskDisplay } from "@/types/task";
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "..";
import {
  collection,
  getDocs,
  query,
  collectionGroup,
  setDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Unsubscribe } from "firebase/auth";

@Module({ dynamic: true, store, name: "TaskModule", namespaced: true })
class TaskModule extends VuexModule {
  inputTask = "";
  assignees: Assignee[] = [];
  inputAssignee: Assignee | null = null;
  tasks: TaskDisplay[] = [];
  unsubscribe: Unsubscribe | null = null;

  @Mutation
  public SET_INPUT_TASK(data: string) {
    this.inputTask = data;
  }
  @Mutation
  public SET_INPUT_ASSIGNEE(data: Assignee) {
    this.inputAssignee = data;
  }
  @Mutation
  public SET_ASSIGNEES(data: Assignee[]) {
    this.assignees = data;
  }
  @Mutation
  public SET_TASKS(data: TaskDisplay[]) {
    this.tasks = data;
  }

  @Action({ rawError: true })
  public InputTask(data: string) {
    this.SET_INPUT_TASK(data);
  }
  @Action({ rawError: true })
  public SelectAssignee(data: Assignee) {
    this.SET_INPUT_ASSIGNEE(data);
  }
  @Action({ rawError: true })
  public AddTask(data: { task: string; assignee: Assignee }) {
    const { task, assignee } = data;
    const addTask = {
      task: task,
      assigneeId: assignee.id,
      assignee: assignee.name,
    };
    try {
      //サブコレクションにデータ追加
      //特定のassigneeのtaskコレクションへのレファレンス
      const assigneeTaskRef = collection(db, "assignee", assignee.id, "task");
      setDoc(doc(assigneeTaskRef), addTask);
    } catch (err) {
      console.log(err);
    }
  }
  @Action({ rawError: true })
  public DeleteTask(data: TaskDisplay) {
    try {
      //削除
      const taskDocRef = doc(db, "assignee", data.assigneeId, "task", data.id);
      deleteDoc(taskDocRef);
    } catch (err) {
      console.log(err);
    }
  }
  @Action({ rawError: true })
  public async GetInitialValue() {
    try {
      //assigneeを取得
      const assigneesQuery = query(collection(db, "assignee"));
      const assigneesSnapshot = await getDocs(assigneesQuery);
      const assignees: Assignee[] = assigneesSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
        };
      });
      this.SET_ASSIGNEES(assignees);

      //リスナーのアタッチ(taskの変更を監視)
      const tasksQuery = query(collectionGroup(db, "task"));
      this.unsubscribe = onSnapshot(
        tasksQuery,
        (tasksSnapShot) => {
          const tasks: TaskDisplay[] = tasksSnapShot.docs.map((doc) => {
            return {
              id: doc.id,
              task: doc.data().task,
              assigneeId: doc.data().assigneeId,
              assignee: doc.data().assignee,
            };
          });
          this.SET_TASKS(tasks);
        },
        (err) => console.log(err)
      );
    } catch (err) {
      console.log(err);
    }
  }

  @Action({ rawError: true })
  public StopListener() {
    //リスナーのデタッチ(taskの変更の監視終了)
    if (this.unsubscribe !== null) this.unsubscribe();
  }
}

export default getModule(TaskModule);
