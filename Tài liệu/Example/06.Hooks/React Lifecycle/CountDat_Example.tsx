import React, { Component } from 'react';

interface MyComponentProps {
  title: string;
  initialCount?: number;
}

interface MyComponentState {
  count: number;
  timeCount: number;
}

/**
 * Giả định Component này có các đối tượng sau đây:
 * - 1 label hiển thị giá trị Count
 * - 1 label thể hiện thời gian đã trôi qua trước khi click vào button Count
 * - 1 label thể hiện thời gian của lần click button trước đó
 * - 1 button sẽ thực hiện Count thêm 1 giá trị sau khi click
 */
class CountDat extends Component<MyComponentProps, MyComponentState> {

  timerID!: NodeJS.Timer;
  // Khởi tạo constructor, trong đó, khai báo các tham số cần thiết trong state
  constructor(props: MyComponentProps) {
    super(props);

    this.state = {
      count: 0,
      timeCount: 0
    };
  }

  //////////////////////////////////////////////////////////////////////////////
  /// Mounting
  //////////////////////////////////////////////////////////////////////////////
  // Lấy giá trị trong props nếu có, rồi truyền vào 
  static getDerivedStateFromProps(props: MyComponentProps, state: number) {
    return {
      count: props.initialCount,
    };
  }

  // Sau khi Component được mount xong thì bắt đầu start timer
  // Thông qua interval giá trị được cập nhật sau mỗi 1 giây
  componentDidMount(): void {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  //////////////////////////////////////////////////////////////////////////////
  /// Updating
  //////////////////////////////////////////////////////////////////////////////

  // Lấy thông tin timeCount trước khi Component được update
  getSnapshotBeforeUpdate(prevProps: Readonly<MyComponentProps>, prevState: Readonly<MyComponentState>) {
    if (document.getElementById('oldTime'))
      document.getElementById('oldTime')!.innerHTML = `Last duration: ${prevState.timeCount}`;
  }

  // Xử lý sau khi Component được update. Thực hiện set lại gái trị state timeCount
  componentDidUpdate(prevProps: Readonly<MyComponentProps>, prevState: Readonly<MyComponentState>, snapshot?: any): void {
    this.setState({ timeCount: 0 });
  }

  //////////////////////////////////////////////////////////////////////////////
  /// Unmounting
  //////////////////////////////////////////////////////////////////////////////

  // Xử lý trước khi Component unmount. Thực hiện clear interval
  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }

  //////////////////////////////////////////////////////////////////////////////
  /// Action
  //////////////////////////////////////////////////////////////////////////////

  // Tăng giá trị mỗi khi count
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // Set giá trị state dành cho timeCount
  tick() {
    this.setState({
      timeCount: this.state.timeCount + 1,
    });
  }

  // Hàm bắt buộc. sẽ sử dụng để render giao diện
  render() {
    const { title } = this.props;
    const { count, timeCount } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <p>Count: {count}</p>
        <p>Time Run: {timeCount}</p>
        <p id='oldTime'></p>
        <button onClick={this.handleIncrement}>Increment</button>
      </div>
    );
  }
}

export default CountDat;