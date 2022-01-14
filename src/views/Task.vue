<template>
  <div class="height-100 d-flex flex-column">
    <div class="d-flex align-center pa-2">
      <v-text-field
        class="pa-4"
        placeholder="追加する作業を入力してください"
        v-model="task"
        hide-details
      ></v-text-field>
      <v-select
        :items="assignees"
        item-text="name"
        label="担当者を選択してください"
        solo
        class="pa-4"
        v-model="assignee"
        hide-details
        return-object
      ></v-select>
      <v-btn
        color="primary"
        class="pa-4"
        :disabled="isDisabledAddButton"
        @click="addTask()"
        >追加</v-btn
      >
    </div>
    <div>
      <v-row class="sub-header align-center px-4">
        <v-col class="col-6 px-4">作業</v-col>
        <v-col class="col-6 px-4">担当者</v-col>
      </v-row>
    </div>
    <div class="relative-container mt-4 flex-grow-1">
      <div class="absolute-container">
        <v-row class="align-center px-4" v-for="task in tasks" :key="task.id">
          <v-col class="col-6 px-4">{{ task.task }}</v-col>
          <v-col class="col-6 px-4 d-flex align-center justify-space-between"
            >{{ task.assignee }}
            <v-btn fab dark x-small color="red" @click="deleteTask(task)">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TaskModule from "@/store/modules/task";
import { Assignee, TaskDisplay } from "@/types/task";
@Component({
  components: {},
})
export default class extends Vue {
  get task(): string {
    return TaskModule.inputTask;
  }
  set task(data: string) {
    TaskModule.InputTask(data);
  }
  get assignees(): Assignee[] {
    return TaskModule.assignees;
  }
  get assignee(): Assignee | null {
    return TaskModule.inputAssignee;
  }
  set assignee(data: Assignee | null) {
    if (data !== null) TaskModule.SelectAssignee(data);
  }
  get tasks(): TaskDisplay[] {
    return TaskModule.tasks;
  }
  get isDisabledAddButton(): boolean {
    return !TaskModule.inputTask || !TaskModule.inputAssignee;
  }

  addTask(): void {
    if (this.assignee !== null) {
      TaskModule.AddTask({ task: this.task, assignee: this.assignee });
    }
  }
  deleteTask(task: TaskDisplay): void {
    TaskModule.DeleteTask(task);
  }

  mounted(): void {
    console.log("mounted");
    TaskModule.GetInitialValue();
  }
  beforeDestroy(): void {
    console.log("beforeDestroy");
    TaskModule.StopListener();
  }
}
</script>

<style scoped>
.sub-header {
  height: 50px;
  background-color: lightblue;
}
.relative-container {
  position: relative;
  width: 100%;
}
.absolute-container {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
