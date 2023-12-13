import SearchCommerce from '@/components/CommerceSearch';

function SearchCommercePage() {

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
            <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
                <SearchCommerce></SearchCommerce>
            </div>
        </div> 
    );
}

export default SearchCommercePage;