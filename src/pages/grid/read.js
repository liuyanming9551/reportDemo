/*
* 1.点击设置报表,出现报表名称设置。右边出现取消和完成设置按钮。下面出现当前选中项的详情。（默认一开始选中状态,选中可以选择的第一个）上面有移除当前选中按钮,以及编辑按钮
* 2.点击取消,弹出确认框。
* 3.点击完成设置,提示当前状态,并进行保存。（如果当前有操作未完成，提示并且不允许提交）
* 4.添加规则：
* (1)点击添加列,出现弹窗,可以进行列的勾选,最终的生成情况是由于当前业务决定的。而且添加的和在列表里面的选项是不能同时存在的。复选框之后是有【新建标题字段】
* (2)点击取消关闭当前弹出框,并且不进行任何操作（如果当前有过操作,但是不能保存,这里需要考虑一下数组的拷贝过程）。点击确定把当前选中列放入到数据列表中。
* (3)点击新建标题字段出现一个新的弹出层,并且原先的弹出层取消,输入名称后，点击取消关闭当前弹出窗,点击确定,如果当前弹出框没有内容,进行提示。如果有,列表增加一个 组下面有俩个选项
* 如果当前选项下面没有内容,不允许进行提交。
* 5.删除规则：
* (1)删除当前选中的按钮,出现确认弹出框。
* (2)如果是一列,直接删除选中项,如果是一组,用户可以选择组头,也可以选择组下面的内容,如果删除的是组头,那么下面的组选项都作为一个新的一块内容,并不直接删除。
* 6.拖拽规则：
* (1)如果是拖动过程中,如果跟其中一项就行位置交互,那么查看后一项位置的参数,并设置为同一类型。
* (2)如果拖出去的项,再拖回来,它还在原来的位置上
*
* */
