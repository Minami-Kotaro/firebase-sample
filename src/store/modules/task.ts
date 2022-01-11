import { Assignee, TaskDisplay } from "@/types/task";
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "..";

@Module({ dynamic: true, store, name: "TaskModule", namespaced: true })
class TaskModule extends VuexModule {
  inputTask = "";
  assignees: Assignee[] = [];
  inputAssignee: Assignee | undefined = undefined;
  tasks: TaskDisplay[] = [
    {
      id: "1",
      task: "やること",
      assignee: "担当者",
    },
    {
      id: "2",
      task: "やること",
      assignee: "担当者",
    },
    {
      id: "3",
      task: "やること",
      assignee: "担当者",
    },
  ];

  @Mutation
  public SET_INPUT_TASK(data: string) {
    this.inputTask = data;
  }
  @Mutation
  public SET_INPUT_ASSIGNEE(data: Assignee) {
    this.inputAssignee = data;
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
  public AddTask() {
    console.log("add");
  }
  @Action({ rawError: true })
  public DeleteTask() {
    console.log("delete");
  }
}

export default getModule(TaskModule);
