#include<iostream>
#include<vector>
using namespace std;
class Solution {
public:
    bool parseBoolExpr(string exp) {
        vector<char> v ;
        int ans = -1 ;
        for(int i = exp.length()-1 ; i >= 0 ; i--){
            char c = exp[i] ;
            if(c == '(' || c == ',') continue;
            if(')' == c || c == 'f' || c == 't'){
                if(c == 'f'){
                    ans = 0 ;
                }else if(c == 't') ans = 1 ;
                v.push_back(c) ;
            }
            else if( c == '&' ){
                v.pop_back() ;
                while(v.back() != ')'){
                    int n = v.back() == 't' ? 1 : 0 ;
                    ans = ( ans & n );
                    v.pop_back() ;
                }
                v.pop_back();
                char push = ans == 1 ? 't' : 'f' ;
                v.push_back(push);
            }
            else if( c == '|' ){
                v.pop_back();
                while(v.back() != ')'){
                    int n = v.back() == 't' ? 1 : 0;
                    ans = ( ans | n );
                    v.pop_back() ;
                }
                v.pop_back();
                char push = ans == 1 ? 't' : 'f' ;
                v.push_back(push);
            }
            else if(c == '!'){
                ans = v.back() == 'f' ? 1 : 0 ;
                v.pop_back();
                v.pop_back();
                v.push_back(ans == 1 ? 't' : 'f') ;
            }
            if(!v.empty() ){
                for(char i : v){
            }
            }
        }
        return ans ;
    }
};
int main()
{
    Solution s;
    string a = "!(!(!(!(&(&(&(&(f),&(!(t),&(f),|(f)),&(!(&(f)),&(t),|(f,f,t))),|(t),&(!(t),!(|(f,f,t)),!(&(f)))),!(&(|(f,f,t),&(&(f),&(!(t),&(f),|(f)),&(!(&(f)),&(t),|(f,f,t))),&(t))),&(&(&(!(&(f)),|(t),&(!(t),!(|(f,f,t)),!(&(f)))),!(|(f,f,t)),&(t,t,f)),&(f),&(&(t),&(!(t),!(|(f,f,t)),!(&(f))),|(f,f,t))))))))";
    cout<<s.parseBoolExpr(a);
    return 0;
}