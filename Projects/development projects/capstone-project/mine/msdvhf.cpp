#include<iostream>
#include<vector>
using namespace std;

int main()
{
    vector<int> nums;
    int n;
    cin>>n;
    for(int i = 0 ; i < n ; i++)
    {
        int t ;
        cin>>t;
        nums.push_back(t);
    }
    int target;
    cin>>target;
    for(int i = 0 ; i < n-1 ; i++)
    {
        int k = 0 ;
        for(int j = i+1 ; j < n ; j++)
        {
            if(nums[i] + nums[j] == target)
            {
                cout<<endl<<i<<endl<<j;
                k++;
                break;
            }
        }
        if(k) break ;
    }

}