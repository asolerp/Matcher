import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { graphqlPending, graphqlError } from '../state/match-list/actions'

export const useGraphql = (graphQuery: any) => {

  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(graphQuery)

  if (loading) dispatch(graphqlPending())
  if (error) dispatch(graphqlError(error))
  

  return { data }

}

