import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

export default class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: this.props.head,
      tableData: this.props.data,
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={style.container}>
        <Table borderStyle={{ borderWidth: 1, borderColor: "grey" }}>
          <Row
            data={state.tableHead}
            style={style.head}
            textStyle={style.headText}
          />
          <Rows
            data={state.tableData}
            style={style.body}
            textStyle={style.bodyText}
          />
        </Table>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    alignItems: "stretch",
    padding: 20,
    backgroundColor: "#fff",
  },
  head: {
    height: 40,
    backgroundColor: "#fefefe",
  },
  body: {
    height: 40,
    backgroundColor: "#fff",
  },
  headText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 6,
  },
  bodyText: {
    fontSize: 14,
    margin: 6,
  },
});
