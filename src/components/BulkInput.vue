<template>
  <div id="BulkInput" class="subjects-content">
    <h3 class="subjects-trimester-title">Self Evaluation Page</h3>

    <div class="self-evaluation-rows">
      Number of Rows: &nbsp;
      <input
        v-model.number="rownum"
        type="number"
        min="1"
        max="10"
        name="rows"
        class="rows-textbox"
      />
      <div
        class="btn btn-blueviolet btn-inline-block btn-create"
        @click="addRow(rownum);"
        v-show="rows.length < 10"
      >
        Add Row
      </div>
    </div>

    <div class="box-body box-self-evaluation">
      <table id="example2" class="table table-hover table-striped sortable">
        <thead>
          <tr>
            <th>Subject Area</th>
            <th>Section</th>
            <th>Grade</th>
            <th>Course Title</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows">
            <td>
              <select v-model="row.subject">
                <option>- - - -</option
                ><br />
                <option value="ENGLISH">ENGLISH</option>
                <option value="MATH">MATH</option>
              </select>
            </td>
            <td>
              <select v-model="row.section">
                <option>- - - -</option
                ><br />
                <option value="IP">IP</option>
                <option value="IQ">IQ</option>
              </select>
            </td>
            <td>
              <select
                name="NAME THIS BASED ON THE SUBJECT CODE SELECTED VALUE"
                v-model="row.grade"
              >
                <option>- - - -</option
                ><br />
                <option value="A+">A+</option>
                <option value="A">A</option>
              </select>
            </td>
            <td><span> </span></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "BulkInput",
  data() {
    return { rows: [], saveData: null, rownum: 1 };
  },
  methods: {
    addRow: function(count) {
      var numRows = this.rows.length;

      if (numRows >= 10) return;

      for (var i = 1; i <= count; i++) {
        this.rows.push({});
        if (++numRows == 10) break;
      }
    },
    removeRow: function(row) {
      //console.log(row);
      this.rows.$remove(row);
    }
  }
};
</script>
