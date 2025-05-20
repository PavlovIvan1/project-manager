import { Category } from './category'

export function CategoryList() {
	return (
		<>
			<h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px', 				marginBottom: '20px'}}>
        Category
      </h2>

      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '12px',
        paddingBottom: '8px',
        WebkitOverflowScrolling: 'touch',
      }}>
        <Category color={'#ffda55'} classp={'WebApp'} title={'design'} projects={2}/>
        <Category color={'#33ccff'} classp={'WebApp'} title={'development'} projects={4}/>
        <Category color={'#ff7f50'} classp={'Bot'} title={'development'} projects={1}/>
      </div>

		</>
	)
}