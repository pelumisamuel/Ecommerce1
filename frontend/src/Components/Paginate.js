import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {/* array constructor with the spread operator create an Array with keys base on the number of pages */}
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
