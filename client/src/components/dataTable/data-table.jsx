import { Component } from 'react'
import PaginationContainer from '../pagination/Pagination'
import './dataTable.css'
export class DataTableComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageInfo: 1,
      show: false
    }
  }

  handleClick = (pageNumber) => {
    const pageOffset = (pageNumber - 1) * this.props.filter.itemPerPage
    this.props.handleClick({
      ...this.props.filter,
      pageOffset
    })
    this.setState({ pageInfo: pageNumber })
  }

  searchText = (event) => {
    this.props.handleClick({
      ...this.props.filter,
      pageOffset: 0,
      search: event.target.value
    })
  }

  sortValue = (sortBy) => {
    this.props.handleClick({
      ...this.props.filter,
      sortBy,
      pageOffset: 0,
      orderBy: this.props.filter.orderBy === 'ASC' ? 'DESC' : 'ASC'
    })
  }

  render () {
    return ( 
      <div className='mx-2'>
        <div className='usrelist table-responsive '>
          <table className='table table-light table-striped table-bordered'>
            <thead className='thead-light'>
              <tr style={{textAlignLast: 'center'}}> 
                {this.props.headerData && this.props.headerData.map((item, i) => {
                  return (
                    <th
                      key={i}
                      scope='col'
                      style={
                        item.title === 'status' || item.title === 'actions'
                          ? { textAlign: 'center' }
                          : {}
                      }
                      className='bg-primary'
                    >
                      {item.title === 'actions'
                        ? ''
                        : item.title !== ''
                          ? item.title.charAt(0).toUpperCase() + item.title.slice(1)
                          : ' '}{' '}
                      {item.sorting
                        ? (
                          <i
                            className='fa fa-fw fa-sort'
                            onClick={() => this.sortValue(item.fieldName)}
                          />
                          )
                        : (
                            ''
                          )}{' '}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.loader
                ? (
                  <tr style={{textAlignLast: 'center'}} >
                    <td
                      colSpan={this.props.headerData.length}
                      style={{ width: '100%', align: 'center' }}
                    >
                      {/* <LoaderContainer {...loaderProperty}></LoaderContainer> */}
                    </td>
                  </tr>
                  ) : this.props?.data?.length === 0
                    ? (
                      <tr style={{textAlignLast: 'center'}}> 
                        <td
                          colSpan={this.props.headerData.length}
                          style={{ padding: '15%', width: '100%', fontSize: '20px', align: 'center' }}
                        >
                          No Found.
                        </td>
                      </tr>
                      )
                    : (
                        this.props.html
                      )}
            </tbody>
          </table>
        </div>
        <div className='d-flex flex-row-reverse me-2 mt-2 navigation'>
          {this.props.pageCount > 1
            ? (
              <PaginationContainer
                activePage={this.state.pageInfo}
                count={this.props.count}
                handleClick={this.handleClick}
              />
              )
            : (
                ''
              )}
        </div>
      </div> 
    )
  }
}