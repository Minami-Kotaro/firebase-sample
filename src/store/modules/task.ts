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
} from "firebase/firestore";
import { db } from "@/firebase";

@Module({ dynamic: true, store, name: "TaskModule", namespaced: true })
class TaskModule extends VuexModule {
  inputTask = "";
  assignees: Assignee[] = [];
  inputAssignee: Assignee | null = null;
  tasks: TaskDisplay[] = [];

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
  public async AddTask(data: { task: string; assignee: Assignee }) {
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
      await setDoc(doc(assigneeTaskRef), addTask);

      //再取得
      const tasksQuery = query(collectionGroup(db, "task"));
      const tasksSnapshot = await getDocs(tasksQuery);
      const tasks: TaskDisplay[] = tasksSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          task: doc.data().task,
          assigneeId: doc.data().assigneeId,
          assignee: doc.data().assignee,
        };
      });
      this.SET_TASKS(tasks);
    } catch (err) {
      console.log(err);
    }
  }
  @Action({ rawError: true })
  public async DeleteTask(data: TaskDisplay) {
    try {
      //削除
      const taskDocRef = doc(db, "assignee", data.assigneeId, "task", data.id);
      await deleteDoc(taskDocRef);

      //再取得
      const tasksQuery = query(collectionGroup(db, "task"));
      const tasksSnapshot = await getDocs(tasksQuery);
      const tasks: TaskDisplay[] = tasksSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          task: doc.data().task,
          assigneeId: doc.data().assigneeId,
          assignee: doc.data().assignee,
        };
      });
      this.SET_TASKS(tasks);
    } catch (err) {
      console.log(err);
    }
  }
  @Action({ rawError: true })
  public async GetInitialValue() {
    try {
      const assigneesQuery = query(collection(db, "assignee"));
      const tasksQuery = query(collectionGroup(db, "task"));
      const assigneesSnapshot = await getDocs(assigneesQuery);
      const tasksSnapshot = await getDocs(tasksQuery);
      const assignees: Assignee[] = assigneesSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
        };
      });
      const tasks: TaskDisplay[] = tasksSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          task: doc.data().task,
          assigneeId: doc.data().assigneeId,
          assignee: doc.data().assignee,
        };
      });
      this.SET_ASSIGNEES(assignees);
      this.SET_TASKS(tasks);
    } catch (err) {
      console.log(err);
    }
  }
}

export default getModule(TaskModule);
